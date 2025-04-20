import dotenv from 'dotenv';
import mariadb, { Pool } from 'mariadb';

dotenv.config();

// console.log(process.env.DB_HOST);

const pool: Pool = mariadb.createPool({
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME,
  connectionLimit: 5,
});

export default pool;
