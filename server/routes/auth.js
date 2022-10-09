import express from 'express';
import { loginUser, registerUser } from '../controllers/auth.js';

const router = express.Router();

// Create account
router.post('/register', registerUser);

// Login to account
router.post('/login', loginUser);

export default router;