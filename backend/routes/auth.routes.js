import express from 'express';
import { getProfile, login, register, UpdateProfile } from '../controllers/auth.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authenticateToken, getProfile);
router.put('/profile/update', authenticateToken, UpdateProfile);

export default router;