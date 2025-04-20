import express, { Request, Response } from 'express';

import todoRoute from './routes/api.route';

const app = express();

app.use(express.json());

app.get('/api/todos', todoRoute);

export default app;
