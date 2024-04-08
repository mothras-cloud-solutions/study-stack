import express from 'express';
import {
    getAllFlashcards,
    getFlashcardById,
    createFlashcard,
    updateFlashcard,
    updateFlashcardConfidenceLevel,
    deleteFlashcard
} from '../controllers/flashcardsController';

const router = express.Router();

router.get('/', getAllFlashcards);
router.get('/:id', getFlashcardById);
router.post('/', createFlashcard);
router.put('/:id', updateFlashcard);
router.put('/:id/confidenceLevel', updateFlashcardConfidenceLevel);
router.delete('/:id', deleteFlashcard);

export default router;
