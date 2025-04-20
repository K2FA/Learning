import { Request, Response } from 'express';
import * as todoService from '../../services/todo/todo.service';
import { TodoType } from '../../types/todo.type';

export async function getAllTodos(req: Request, res: Response) {
  try {
    const todos = await todoService.getTodos();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch Todos' });
  }
}

export async function createTodo(req: Request, res: Response) {
  try {
    const newTodo: TodoType = req.body;
    const createdTodo = await todoService.createTodo(newTodo);

    const responseTodo = {
      ...createdTodo,
      id: createdTodo.id ? createdTodo.id.toString() : undefined,
    };

    res.status(201).json({ message: 'Todo created successfully', todo: responseTodo });
  } catch (err: any) {
    res.status(400).json({ message: 'Failed to create Todo', error: err.message });
  }
}

export async function updateTodo(req: Request<{ id: string }, any, TodoType>, res: Response) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID parameter' });
    }

    const updatedTodo: TodoType = req.body;

    const success = await todoService.updateTodo(id, updatedTodo);

    if (!success) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.status(200).json({ message: 'Todo updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update Todo' });
  }
}

export async function deleteTodo(req: Request<{ id: string }>, res: Response) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid Todo ID' });
    }

    const success = await todoService.deleteTodo(id);

    if (!success) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json({ message: 'Todo deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete Todo' });
  }
}
