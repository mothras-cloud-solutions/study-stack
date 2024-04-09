import express from 'express';
import { getAllCanvases,
  getCanvasById,
  createCanvas,
  updateCanvas,
  deleteCanvas
} from '../controllers/canvasesController';

const router = express.Router();

router.get('/', getAllCanvases);
router.get('/:id', getCanvasById);
router.post('/', createCanvas);
router.put('/:id', updateCanvas);
router.delete('/:id', deleteCanvas);

export default router;
