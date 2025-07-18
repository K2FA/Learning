import dotenv from 'dotenv';
import { createPool } from 'mariadb';

dotenv.config();

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  throw new Error('Database is Not Defined!!!');
}

const parsedUrl = new URL(dbUrl);

const pool = createPool({
  host: parsedUrl.hostname,
  port: Number(parsedUrl.port),
  user: parsedUrl.username,
  password: parsedUrl.password,
  database: parsedUrl.pathname.substring(1),
  connectionLimit: 5,
});

export default pool;
