import { Tasks } from '../entities/Tasks';
import { TasksRepository } from './tasksRepository';

export class TasksRepositoryInMemory implements TasksRepository {
  public notes: Tasks[] = [];

  async upsert(note: Tasks): Promise<Tasks | undefined> {
    const index = this.notes.findIndex((n) => n.id === note.id);

    if (index !== -1) {
      this.notes[index] = note;
    } else {
      this.notes.push(note);
    }

    return note;
  }

  async findById(id: string): Promise<Tasks | null> {
    const note = this.notes.find((note) => note.id === id);

    return note || null;
  }

  async findAll(): Promise<Tasks[]> {
    const notes = this.notes;

    return notes;
  }

  async delete(id: string): Promise<null> {
    this.notes = this.notes.filter((note) => note.id !== id);

    return null;
  }
}
