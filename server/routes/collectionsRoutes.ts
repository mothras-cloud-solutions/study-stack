import express from 'express';
import {
    getAllCollections,
    getCollectionById,
    getAllCollectionsByUserId,
    getCollectionByUserId,
    createCollection,
    updateCollection,
    deleteCollection
} from '../controllers/collectionsController';

const router = express.Router();

router.get('/', getAllCollections);
router.get('/:id', getCollectionById);
router.get('/user/:user_id', getAllCollectionsByUserId);
router.get('/user/:user_id/:id', getCollectionByUserId);
router.post('/', createCollection);
router.put('/:id', updateCollection);
router.delete('/:id', deleteCollection);

export default router;
