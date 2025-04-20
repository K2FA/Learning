import { Router } from 'express';
import * as todoController from '../controller/todo/todo.controller';

const router = Router();

router.get('/', todoController.getAllTodos);
router.post('/', todoController.createTodo);
router.put('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);

export default router;
