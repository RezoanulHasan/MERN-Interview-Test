import { z } from 'zod';

export const DrawingElementSchema = z.object({
  type: z.enum(['line', 'shape', 'text']),
  coordinates: z.array(z.number()).optional(),
  text: z.string().optional(),
});

export const DrawingValidationSchema = z.object({
  title: z.string(),
  description: z.string(),
  elements: z.array(DrawingElementSchema),
});
export const UpdateDrawingValidationSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  elements: z.array(DrawingElementSchema).optional(),
});
