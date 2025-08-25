import pool from '../config/db.config';
import { PermissionTYpe } from '../types/role-permission.type';

export const getAllPermissionService = async (): Promise<PermissionTYpe> => {
  const conn = await pool.getConnection();

  const permissions = await conn.query('SELECT * FROM permissions');

  conn.release();
  return permissions;
};

export const createPermissionService = async (permission: PermissionTYpe): Promise<{ id: number }> => {
  const conn = await pool.getConnection();

  const permissionData = await conn.query('INSERT INTO permissions (name, description) VALUES (?,?)', [
    permission.name,
    permission.description,
  ]);

  conn.release();

  return { id: Number(permissionData.insertId) };
};

export const updatePermissionService = async (id: Number, permission: PermissionTYpe): Promise<boolean> => {
  const conn = await pool.getConnection();

  const permissionData = await conn.query('UPDATE permissions SET name = ?, description = ?, WHERE id = ?', [
    permission.name,
    permission.description,
    id,
  ]);

  conn.release();

  return permissionData.affectedRows > 0;
};

export const deletePermissionService = async (id: Number): Promise<boolean> => {
  const conn = await pool.getConnection();

  const permissionData = await conn.query('DELETE from permissions where id  = ?', [id]);

  conn.release();

  return permissionData.affectedRows > 0;
};
