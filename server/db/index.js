import { Pool } from 'pg';
import dotenv from 'dotenv';
import models from './models';

dotenv.config();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});


(async () => {
  const client = await pool.connect();
  try {
    // start transaction
    await client.query('BEGIN');
    await models(client);
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    console.log(error);
  } finally {
    client.release();
  }
})();

export default pool;
