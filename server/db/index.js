/* eslint-disable linebreak-style */
import { Pool } from 'pg';
import dotenv from 'dotenv';
import queries from './queries';

dotenv.config();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
(async () => {
  const client = await pool.connect();
  try {
    // start transaction
    await client.query('BEGIN');
    await queries(client);
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
  } finally {
    client.release();
  }
})();

export default pool;
