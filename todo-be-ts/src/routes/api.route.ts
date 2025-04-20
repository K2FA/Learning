import bodyParser from 'body-parser';
import { TodoController } from '../controller/Todo/todo.controller';

const express = require('express');
const router = express.Router();

router.get('/todo', TodoController);

export default router;
