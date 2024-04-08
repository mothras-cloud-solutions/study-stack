import express from 'express';
import { getAllCanvases } from '../controllers/canvasesController';

const router = express.Router();

router.get('/', getAllCanvases);

export default router;
