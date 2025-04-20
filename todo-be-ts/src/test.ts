import pool from './config/db';

async function test() {
  try {
    const conn = await pool.getConnection();
    const rows = await conn.query('SELECT 1 as val');
    console.log(rows);
    conn.release();
  } catch (err) {
    console.error('Error conectiong to the databases', err);
  }
}

test();
