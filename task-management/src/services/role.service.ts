import pool from '../config/db.config';
import { RoleType } from '../types/role.type';

export const getAllRoleService = async (): Promise<RoleType> => {
  const conn = await pool.getConnection();
  const data = await conn.query('SELECT * FROM roles');

  conn.release();
  return data;
};

export const createRoleService = async (role: RoleType): Promise<{ id: number }> => {
  const conn = await pool.getConnection();

  const data = await conn.query('INSERT INTO roles (name, description) VALUES (?, ?)', [role.name, role.description]);

  conn.release();

  return { id: Number(data.insertId) };
};

export const updateRoleService = async (id: number, role: RoleType): Promise<boolean> => {
  const conn = await pool.getConnection();

  const updateData = await conn.query('UPDATE roles SET name = ?, description = ? WHERE id = ?', [
    role.name,
    role.description,
    id,
  ]);

  conn.release();

  return updateData.affectedRows > 0;
};

export const deleteRoleService = async (id: number): Promise<boolean> => {
  const conn = await pool.getConnection();

  const result = await conn.query('DELETE FROM roles where id = ?', [id]);

  conn.release();

  return result.affectedRows > 0;
};
