import express from 'express';
import todoRoutes from './routes/todo.route'; // assuming the path

const app = express();

app.use(express.json()); // To parse JSON bodies

app.use('/api/todos', todoRoutes);

export default app;
