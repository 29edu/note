import protect from "../middlewares/auth.js";
import { createNote,getNotes, getNoteById, updateNote, deleteNote } from "../controllers/noteController.js";
import express from 'express'
const router = express.Router();

router.get('/', protect, getNotes);

router.post('/', protect, createNote);

router.get('/:id', protect, getNoteById)

router.put('/:id', protect, updateNote)

router.delete('/:id', protect, deleteNote);

export default router;
