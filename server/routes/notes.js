import express from 'express';
import { addNote, deleteNote, getAllNotes, getNote, getNoteBySearch, updateNote } from '../controllers/notes.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

// Create/Update/Delete/Get Notes
router.get('/all',verifyToken, getAllNotes)
router.get('/search', verifyToken, getNoteBySearch)
router.post('/', verifyToken, addNote);
router.put('/:id',verifyToken,updateNote);
router.delete('/:id',verifyToken,deleteNote);
router.get('/:id', verifyToken, getNote);

export default router;