import Pool from '../config/db.config';
import { UserType } from '../types/user.type';
import { hashPassword } from '../utils/auth.utils';

export const getAllUser = async (): Promise<UserType[]> => {
  const conn = await Pool.getConnection();
  const data = await conn.query('SELECT * FROM users');

  conn.release();
  return data;
};

export const createUsers = async (user: UserType): Promise<{ id: number }> => {
  const conn = await Pool.getConnection();

  const hash = await hashPassword(user.password);

  const data = await conn.query('INSERT INTO users (fullname, email, password) VALUES (?,?,?)', [
    user.fullname,
    user.email,
    hash,
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

  const hash = await hashPassword(user.password);

  const updateData = await conn.query('UPDATE users SET fullname = ?, email = ?, password = ? WHERE id = ?', [
    user.fullname,
    user.email,
    hash,
    id,
  ]);

  conn.release();

  return updateData.affectedRows > 0;
};
