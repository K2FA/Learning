import { NextFunction, Request, Response } from 'express';
import mariadb from 'mariadb';
import pool from '../config/db.config';

interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
  };
}

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = (req as AuthenticatedRequest).headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Authorization token required' });

  let conn: mariadb.PoolConnection | undefined;
  try {
    conn = await pool.getConnection();

    const rows = await conn.query('SELECT user_id, expires_at FROM sessions where token = ? LIMIT 1', [token]);

    if (rows.length === 0) {
      return res.status(401).json({ message: 'invalid token' });
    }

    console.log(rows);

    const session = rows[0];
    const now = new Date();
    const expiresAt = new Date(session.expires_at);

    if (expiresAt < now) {
      await conn.query('DELETE FROM sessions WHERE token = ?', [token]);
      return res.status(401).json({ message: 'Token expired' });
    }

    (req as AuthenticatedRequest).user = { id: session.user_id };
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ message: 'Authentication failed' });
  } finally {
    // Release connection back to pool
    if (conn) conn.release();
  }
};
