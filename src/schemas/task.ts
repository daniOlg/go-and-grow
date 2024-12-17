import { z } from 'zod';

export const TaskSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'El título es obligatorio'),
  description: z.string().min(1, 'La descripción es obligatoria'),
  completed: z.boolean().default(false),
  image: z.string().optional(),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }).optional(),
});

export type Task = z.infer<typeof TaskSchema>;
