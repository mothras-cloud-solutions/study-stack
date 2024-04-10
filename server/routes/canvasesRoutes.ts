import express from 'express';
import { getAllCanvases,
  getCanvasById,
  // createCanvas,
  // updateCanvas,
  updateCanvasFront,
  updateCanvasBack,
  swapCanvasArchived,
  deleteCanvas
} from '../controllers/canvasesController';

const router = express.Router();

router.get('/', getAllCanvases);
router.get('/flashcards_id', getCanvasById);

// router.post('/createCanvasFront', createCanvasFront);
// router.post('/createCanvasBack', createCanvasBack);

router.put('/:flashcards_id/canvasFront', updateCanvasFront);
router.put('/:flashcards_id/canvasBack', updateCanvasBack);
router.put('/:flashcards_id/canvasArchived', swapCanvasArchived);

router.delete('/flashcards_id', deleteCanvas);

export default router;
