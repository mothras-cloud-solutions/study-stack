import express from 'express';
import {
    getAllCollections,
    getCollectionById,
    createCollection,
    updateCollection,
    deleteCollection
} from '../controllers/collectionsController';

const router = express.Router();

router.get('/', getAllCollections);
router.get('/:id', getCollectionById);
router.post('/', createCollection);
router.put('/:id', updateCollection);
router.delete('/:id', deleteCollection);

export default router;
