import { Request, RequestHandler, Response } from 'express';
import { loginService, logoutService, registerService } from '../services/auth.service';
import { RegisterType } from '../types/auth.type';

export const loginController: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { token, expiresAt } = await loginService(req.body);

    res.status(201).json({ message: 'login success', data: { token, expiresAt } });
  } catch (error: any) {
    if (error.message === 'Invalid credentials') {
      res.status(401).json({ message: error.message });
      return;
    }
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed' });
  }
};

export const registerController: RequestHandler = async (req: Request, res: Response) => {
  const { username, email, password, confirmPassword }: RegisterType & { confirmPassword: string } = req.body;

  if (!username || !email || !password || !confirmPassword) {
    res.status(400).json({ status: 'failed', message: 'All field are required' });
    return;
  }

  if (password !== confirmPassword) {
    res.status(400).json({
      status: 'failed',
      message: 'Password not match',
    });
    return;
  }

  try {
    const { token, expiresAt } = await registerService({ username, email, password });

    res.status(201).json({
      status: 'success',
      data: {
        token,
        expires_at: expiresAt.toISOString(),
        message: 'Registration successfull',
      },
    });
  } catch (error: any) {
    if (error.message === 'Email already registered') {
      res.status(409).json({
        status: 'failed',
        message: error.message,
      });
    } else if (error.message === 'Username already taken') {
      res.status(409).json({
        status: 'failed',
        message: error.message,
      });
    } else {
      console.error('Registration error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
    }
  }
};

export const logoutController: RequestHandler = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(400).json({ status: 'failed', message: 'Authorization token required in Bearer format' });
    return;
  }

  try {
    await logoutService(token);

    res.json({ message: 'Logout successful' });
  } catch (error: any) {
    if (error.message === 'Invalid token format') {
      res.status(400).json({
        status: 'fail',
        message: 'Invalid token format',
      });
    } else if (error.message === 'Session not found') {
      res.status(404).json({
        status: 'fail',
        message: 'Session not found or already expired',
      });
    } else {
      console.error('Logout error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
    }
  }
};
