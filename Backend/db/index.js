import { Pool } from 'pg';
const password = 'Servesh#21'
const encodedPassword = encodeURIComponent(password);
console.log(encodedPassword)
const uri =`postgresql://postgres:Servesh%2321@localhost:5432/todoapp`
const pool = new Pool({
  
  connectionString: uri,
});

export default pool;
