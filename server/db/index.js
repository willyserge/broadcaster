import { Pool } from 'pg';
import env from 'dotenv';
import models from './models';

env.config();
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  password: 4512,
  database: 'broadcaster',


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
