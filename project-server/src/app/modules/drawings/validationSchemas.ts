import { z } from 'zod';

export const DrawingElementSchema = z.object({
  type: z.enum(['line', 'shape', 'text']),
  coordinates: z
    .array(z.number())
    .length(4, 'Coordinates should have exactly four values (x1, y1, x2, y2)'),
  text: z.string().optional(),
});

export const DrawingValidationSchema = z.object({
  title: z.string(),
  description: z.string(),
  elements: z.array(DrawingElementSchema),
});
