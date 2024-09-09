/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Schema, Document, Model } from 'mongoose';
import { DrawingValidationSchema as ValidationDrawingSchema } from './validationSchemas';
import { UpdateDrawingValidationSchema } from './validationSchemas';

export interface IDrawingElement {
  type: 'line' | 'shape' | 'text';
  coordinates?: number[];
  text?: string;
}

export interface IDrawing extends Document {
  title: string;
  description: string;
  elements: IDrawingElement[];
  createdAt?: Date;
  updatedAt?: Date;
}

const DrawingSchema: Schema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String },
    elements: [
      {
        type: {
          type: String,
          enum: ['line', 'shape', 'text'],
          required: true,
        },
        coordinates: {
          type: [Number],
        },
        text: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const DrawingModel: Model<IDrawing> = mongoose.model<IDrawing>(
  'Drawing',
  DrawingSchema,
);

// Zod validation for drawing input data (to validate before saving)
export const validateDrawing = (data: Record<string, any>) =>
  ValidationDrawingSchema.parse(data);
export const UpdateDrawing = (data: Record<string, any>) =>
  UpdateDrawingValidationSchema.parse(data);
