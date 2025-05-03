import { Pool } from 'pg';
const password = 'Servesh#21'
import dotenv from 'dotenv';
dotenv.config();

const encodedPassword = encodeURIComponent(password);
console.log(encodedPassword)
const uri =process.env.DATABASE_URL || `postgres://postgres:${encodedPassword}@localhost:5432/TaskManager`;
const pool = new Pool({
  
  connectionString: uri,
});

export default pool;
