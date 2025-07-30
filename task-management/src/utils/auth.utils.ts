import bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';

export const generateToken = () => randomBytes(32).toString('hex');

export const hashPassword = async (password: string) => await bcrypt.hash(password, 10);

export const verifyPassword = async (password: string, hash: string) => await bcrypt.compare(password, hash);

export const getTokenExpiration = () => {
  const expires = new Date();
  expires.setDate(expires.getDate() + 7);
  return expires;
};
