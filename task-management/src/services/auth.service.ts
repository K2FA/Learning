import mariadb from 'mariadb';
import pool from '../config/db.config';
import { LoginType, RegisterType } from '../types/auth.type';
import { generateToken, getTokenExpiration, hashPassword, verifyPassword } from '../utils/auth.utils';

export const registerService = async (
  authData: RegisterType,
): Promise<{ userId: number; token: string; expiresAt: Date }> => {
  let conn: mariadb.PoolConnection | null = null;

  try {
    conn = await pool.getConnection();

    await conn.beginTransaction();

    const [emailCheck] = await conn.query('SELECT id FROM users WHERE email = ? LIMIT 1', [authData.email]);

    if (emailCheck) {
      throw new Error('Email already registered');
    }

    const [fullnameCheck] = await conn.query('SELECT id FROM users WHERE fullname = ? LIMIT 1', [authData.fullname]);

    if (fullnameCheck) {
      throw new Error('fullname already exist');
    }

    const passwordHash = await hashPassword(authData.password);

    const result = await conn.query('INSERT INTO users (fullname, email, password, created_at) VALUES (?, ?, ?, ?)', [
      authData.fullname,
      authData.email,
      passwordHash,
      new Date(),
    ]);

    const userId = result.insertId;

    const token = generateToken();
    const expiresAt = getTokenExpiration();

    await conn.query(
      `INSERT INTO sessions (user_id, token, expires_at) 
       VALUES (?, ?, ?)`,
      [userId, token, expiresAt],
    );

    await conn.commit();

    return { userId, token, expiresAt };
  } catch (error) {
    if (conn) await conn.rollback();
    throw error;
  } finally {
    if (conn) conn.release();
  }
};

export const loginService = async (authData: LoginType) => {
  const conn = await pool.getConnection();

  const userRows = await conn.query('SELECT * FROM users WHERE email = ? LIMIT 1', [authData.email]);

  if (userRows.length === 0) {
    throw new Error('Invalid credentials');
  }

  const user = userRows[0];

  const passwordMatch = await verifyPassword(authData.password, user.password);
  if (!passwordMatch) {
    throw new Error('Invalid credentials');
  }

  const token = generateToken();
  const expiresAt = getTokenExpiration();

  await conn.query('INSERT INTO sessions (user_id, token, expires_at) VALUES (?, ?, ?)', [user.id, token, expiresAt]);

  conn.release();
  return { token, expiresAt };
};

export const logoutService = async (token: string): Promise<void> => {
  if (!/^[a-f0-9]{64}$/i.test(token)) {
    throw new Error('Invalid token format');
  }

  const conn = await pool.getConnection();

  const result = await conn.query('DELETE FROM sessions WHERE token = ?', [token]);

  if (result.affectedRows === 0) {
    throw new Error('session not found');
  }

  conn.release();
};
