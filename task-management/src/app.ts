import express from 'express';
import userRoute from './routes/user.route';

const app = express();

app.use(express.json());

app.use('/api/users', userRoute);

export default app;
