import pool from '../../config/db';
import { TodoType } from '../../types/todo.type';

export async function getTodos(): Promise<TodoType[]> {
  const conn = await pool.getConnection();
  const rows = await conn.query('SELECT * FROM todos');
  conn.release();

  return rows;
}

export async function createTodo(todo: TodoType): Promise<TodoType> {
  const conn = await pool.getConnection();
  const result = await conn.query('INSERT INTO todos (title, todo, date) VALUES (?, ?, ?)', [
    todo.title,
    todo.todo,
    todo.date,
  ]);
  conn.release();

  return result.insertId;
}

export async function updateTodo(id: number, todo: TodoType): Promise<boolean> {
  const conn = await pool.getConnection();
  const result = await conn.query('UPDATE todos SET title = ?, todo = ?, date = ? WHERE id = ?', [
    todo.title,
    todo.todo,
    todo.date,
    id,
  ]);
  conn.release();

  return result.affectedRows > 0;
}

export async function deleteTodo(id: number): Promise<boolean> {
  const conn = await pool.getConnection();
  const result = await conn.query('DELETE FROM todos WHERE id = ?', [id]);
  conn.release();

  return result.affectedRows > 0;
}
