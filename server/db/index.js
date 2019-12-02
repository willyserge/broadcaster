import { Pool } from 'pg';
import dotenv from 'dotenv';
import models from './models';

dotenv.config();
const pool = new Pool({
  user: process.env.dbUser,
  host: process.env.dbHost,
  password: process.env.dbPassword,
  database: process.env.dbName,

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
