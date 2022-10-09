import express from 'express';
import { loginUser, logoutUser, registerUser } from '../controllers/auth.js';

const router = express.Router();

// Create account
router.post('/register', registerUser);

// Login to account
router.post('/login', loginUser);

// Logout from account
router.post('/logout', logoutUser);

export default router;