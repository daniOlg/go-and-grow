import { z } from 'zod';

export const TaskSchema = z.object({
  title: z.string().min(1, 'El título es obligatorio'),
  description: z.string().min(1, 'La descripción es obligatoria'),
});

export type Task = z.infer<typeof TaskSchema>;
