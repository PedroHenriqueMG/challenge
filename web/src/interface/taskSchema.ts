import { z } from "zod";

export const taskSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(1, "O titulo da tarefa precisa ter pelo menos 1 caracteres."),
  description: z
    .string()
    .min(1, "A descrição da tarefa precisa ter pelo menos 1 caracteres."),
  stage: z.string(),
  position: z.number(),
});

export const createTaskSchema = taskSchema.omit({
  id: true,
  stage: true,
});

export const createTaskFormSchema = createTaskSchema.omit({
  position: true,
});

export const updateTaskFormSchema = createTaskFormSchema;

export type Task = z.infer<typeof taskSchema>;
export type CreateTask = z.infer<typeof createTaskSchema>;
export type CreateTaskForm = z.infer<typeof createTaskFormSchema>;
export type UpdateTaskForm = z.infer<typeof updateTaskFormSchema>;
