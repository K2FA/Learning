import express from 'express';
import authRoute from './routes/auth.route';
import roleRoute from './routes/role.route';
import userRoute from './routes/user.route';

const app = express();

app.use(express.json());

app.use('/api/users', userRoute);
app.use('/api', authRoute);
app.use('/api/roles', roleRoute);

export default app;
