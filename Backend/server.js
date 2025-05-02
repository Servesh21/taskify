import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
//import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

//app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log( process.env.DATABASE_URL); // must be 'string'
    console.log(`Server running on port ${PORT}`)

});
