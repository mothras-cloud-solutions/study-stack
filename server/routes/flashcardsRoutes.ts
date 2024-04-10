import express from 'express';
import {
    getAllFlashcards,
    getFlashcardById,
    getFlashcardsByCollection,
    createFlashcard,
    updateFlashcard,
    updateFlashcardConfidenceLevel,
    swapStarredStatus,
    swapArchivedStatus,
    deleteFlashcard
} from '../controllers/flashcardsController';

const router = express.Router();

router.get('/', getAllFlashcards);
router.get('/collection_id/:collection_id', getFlashcardsByCollection);
router.get('/:id', getFlashcardById);

router.post('/', createFlashcard);

router.put('/:id', updateFlashcard);
router.put('/:id/confidenceLevel', updateFlashcardConfidenceLevel);
router.put('/:id/starred', swapStarredStatus);
router.put('/:id/archived', swapArchivedStatus);

router.delete('/:id', deleteFlashcard);


export default router;
