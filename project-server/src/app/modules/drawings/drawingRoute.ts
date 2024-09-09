import express from 'express';

import {
  deleteDrawing,
  createDrawing,
  getAllDrawings,
  getDrawingById,
  updateDrawing,
} from './drawing.controller';

const router = express.Router();

router.post('/', createDrawing);

router.get('/', getAllDrawings);

router.get('/:id', getDrawingById);

router.put('/:id', updateDrawing);

router.delete('/:id', deleteDrawing);

export const DrawingRoutes = router;
