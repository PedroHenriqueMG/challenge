import { Tasks } from '../entities/Tasks';

export abstract class TasksRepository {
  abstract upsert(note: Tasks): Promise<Tasks | undefined>;
  abstract findById(id: string): Promise<Tasks | null>;
  abstract findAll(): Promise<Tasks[]>;
  abstract delete(id: string): Promise<null>;
}
