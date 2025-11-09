import express from 'express';
import { createTask, deleteTask, getTasks, updateTask } from '../controllers/task.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router();

// All task routes require authentication
router.get('/get-tasks', authenticateToken, getTasks);
router.post('/create-task', authenticateToken, createTask);
router.put('/update-task/:id', authenticateToken, updateTask);
router.delete('/delete-task/:id', authenticateToken, deleteTask);

export default router;