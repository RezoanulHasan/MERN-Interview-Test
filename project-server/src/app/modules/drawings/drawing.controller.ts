import { Request, Response, RequestHandler } from 'express';
import catchAsync from '../../../utils/catchAsync';
import { DrawingModel, UpdateDrawing, validateDrawing } from './drawing.model';

// Create a new drawing
export const createDrawing: RequestHandler = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const drawingData = validateDrawing(req.body);

    const newDrawing = await DrawingModel.create(drawingData);

    res.status(201).json({
      statusCode: 201,
      success: true,
      message: 'Successfully created a new drawing',
      data: newDrawing,
    });
  },
);

// Get all drawings
export const getAllDrawings: RequestHandler = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const drawings = await DrawingModel.find();
    const total = await DrawingModel.countDocuments({});
    if (drawings.length > 0) {
      res.status(200).json({
        statusCode: 200,
        success: true,
        message: 'Successfully retrieved all drawing data',
        totalData: total,
        data: drawings,
      });
    } else {
      res.status(404).json({
        statusCode: 404,
        success: false,
        message: 'No drawing data found',
      });
    }
  },
);

// Get a specific drawing by ID
export const getDrawingById: RequestHandler = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const drawing = await DrawingModel.findById(id);

    if (drawing) {
      res.status(200).json({
        statusCode: 200,
        success: true,
        message: 'Successfully retrieved drawing data',
        data: drawing,
      });
    } else {
      res.status(404).json({
        statusCode: 404,
        success: false,
        message: 'Drawing not found',
      });
    }
  },
);

// Update a drawing by ID
export const updateDrawing: RequestHandler = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const updatedDrawingData = UpdateDrawing(req.body);

    const updatedDrawing = await DrawingModel.findByIdAndUpdate(
      id,
      updatedDrawingData,
      {
        new: true,
        runValidators: true,
      },
    );

    if (updatedDrawing) {
      res.status(200).json({
        statusCode: 200,
        success: true,
        message: 'Successfully updated the drawing',
        data: updatedDrawing,
      });
    } else {
      res.status(404).json({
        statusCode: 404,
        success: false,
        message: 'Drawing not found for updating',
      });
    }
  },
);

// Delete a drawing by ID
export const deleteDrawing: RequestHandler = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const deletedDrawing = await DrawingModel.findByIdAndDelete(id);

    if (deletedDrawing) {
      res.status(200).json({
        statusCode: 200,
        success: true,
        message: 'Successfully deleted the drawing',
        data: deletedDrawing,
      });
    } else {
      res.status(404).json({
        statusCode: 404,
        success: false,
        message: 'Drawing not found for deletion',
      });
    }
  },
);
