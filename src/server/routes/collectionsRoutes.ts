import express from 'express';
import { getAllCollections } from '../controllers/collectionsController';

const router = express.Router();

router.get('/', getAllCollections);

export default router;
