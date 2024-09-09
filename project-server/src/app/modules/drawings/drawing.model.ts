/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Schema, Document, Model } from 'mongoose';
import { DrawingValidationSchema as ValidationDrawingSchema } from './validationSchemas';

export interface IDrawingElement {
  type: 'line' | 'shape' | 'text';
  coordinates: number[]; // this should be [x1, y1, x2, y2]
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
    title: { type: String, required: true },
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
          validate: {
            validator: (arr: number[]) => arr.length === 4,
            message: 'Coordinates must have exactly four numbers.',
          },
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

// Mongoose model for Drawing
export const DrawingModel: Model<IDrawing> = mongoose.model<IDrawing>(
  'Drawing',
  DrawingSchema,
);

// Zod validation for drawing input data (to validate before saving)
export const validateDrawing = (data: Record<string, any>) =>
  ValidationDrawingSchema.parse(data);
