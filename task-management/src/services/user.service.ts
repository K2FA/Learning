import bcrypt from 'bcryptjs';
import Pool from '../config/db.config';
import { UserType } from '../types/user.type';

export const getAllUser = async (): Promise<UserType[]> => {
  const conn = await Pool.getConnection();
  const data = await conn.query('SELECT * FROM users');

  conn.release();
  return data;
};

export const createUsers = async (user: UserType): Promise<{ id: number }> => {
  const conn = await Pool.getConnection();

  const hashPassword = await bcrypt.hash(user.password, 10);

  const data = await conn.query('INSERT INTO users (username, email, password) VALUES (?,?,?)', [
    user.username,
    user.email,
    hashPassword,
  ]);

  conn.release();
  return { id: Number(data.insertId) };
};

export const deleteUsers = async (id: number): Promise<boolean> => {
  const conn = await Pool.getConnection();
  const result = await conn.query('DELETE FROM users where id = ?', [id]);

  conn.release();
  return result.affectedRows > 0;
};

export const updateUsers = async (id: number, user: UserType): Promise<boolean> => {
  const conn = await Pool.getConnection();

  const hashPassword = await bcrypt.hash(user.password, 10);

  const updateData = await conn.query('UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?', [
    user.username,
    user.email,
    hashPassword,
    id,
  ]);

  conn.release();

  return updateData.affectedRows > 0;
};
