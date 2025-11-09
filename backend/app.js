import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/task.routes.js';
import corsOptions from './middleware/cors.middleware.js';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

export default app;