import * as userModel from '../../model/todo/todo.model';
import { TodoType } from '../../types/todo.type';

export async function getTodos(): Promise<TodoType[]> {
  const todos = await userModel.getTodos();
  return todos;
}

export async function createTodo(todo: TodoType): Promise<TodoType> {
  const createdTodo = await userModel.createTodo(todo);
  return createdTodo;
}

export async function updateTodo(id: number, todo: TodoType): Promise<boolean> {
  const updatedTodo = await userModel.updateTodo(id, todo);
  return updatedTodo;
}

export async function deleteTodo(id: number): Promise<boolean> {
  const deletedTodo = await userModel.deleteTodo(id);
  return deletedTodo;
}
