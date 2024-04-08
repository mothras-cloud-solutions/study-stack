import express from 'express';
import { getAllFlashcards } from '../controllers/flashcardsController';

const router = express.Router();

router.get('/', getAllFlashcards);

export default router;