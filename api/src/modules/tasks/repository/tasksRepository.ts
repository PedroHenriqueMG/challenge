import { Tasks, TaskUpdateProps } from '../entities/Tasks';

export abstract class TasksRepository {
  abstract upsert(task: Tasks): Promise<Tasks | undefined>;
  abstract findById(id: string): Promise<Tasks | null>;
  abstract findAll(): Promise<Tasks[]>;
  abstract updateTaskStage(task: TaskUpdateProps): Promise<void>;
  abstract delete(id: string): Promise<null>;
}
