import { Note } from '../entities/Note';
import { TasksRepository } from './tasksRepository';

export class TasksRepositoryInMemory implements TasksRepository {
  public notes: Note[] = [];

  async upsert(note: Note): Promise<Note | undefined> {
    const index = this.notes.findIndex((n) => n.id === note.id);

    if (index !== -1) {
      this.notes[index] = note;
    } else {
      this.notes.push(note);
    }

    return note;
  }

  async findById(id: string): Promise<Note | null> {
    const note = this.notes.find((note) => note.id === id);

    return note || null;
  }

  async findAll(user_id: string): Promise<Note[]> {
    const notes = this.notes.filter((n) => n.user_id === user_id);

    return notes;
  }

  async delete(id: string): Promise<null> {
    this.notes = this.notes.filter((note) => note.id !== id);

    return null;
  }
}
