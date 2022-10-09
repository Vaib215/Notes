import express from 'express';
import { deleteUser, getUser, updateUser } from '../controllers/users.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

// Update/Delete/Get User Details
router.put('/:id',verifyToken,updateUser);
router.delete('/:id',verifyToken,deleteUser);
router.get('/', verifyToken, getUser)

export default router;