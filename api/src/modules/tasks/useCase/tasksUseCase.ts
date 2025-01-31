import { Injectable } from '@nestjs/common';
import { Note } from '../entities/Note';
import { NoteNotFoundException } from '../exceptions/NoteNotFound';
import { TasksRepository } from '../repository/tasksRepository';

interface NoteProps {
  user_id: string;
  user_email: string;
  title: string;
  description?: string;
  note: string;
}

interface NoteUpdateProps {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  note: string;
}

@Injectable()
export class TasksUseCase {
  constructor(
    private tasksRepository: TasksRepository,
  ) {}

  async create({ note, title, description, user_id, user_email }: NoteProps) {
    const notes = new Note({
      description,
      note,
      title,
      user_id,
    });
    const createNote = await this.tasksRepository.upsert(notes);

    return createNote;
  }

  async findAll(user_id: string) {
    const allNotes = await this.tasksRepository.findAll(user_id);

    return allNotes;
  }

  async findOne(id: string) {
    const note = await this.tasksRepository.findById(id);

    if (!note) throw new NoteNotFoundException();

    return note;
  }

  async update({
    id,
    note,
    title,
    description,
    user_id,
  }: NoteUpdateProps): Promise<Note | undefined> {
    const existNote = await this.tasksRepository.findById(id);

    if (!existNote) throw new NoteNotFoundException();

    const updateNote = await this.tasksRepository.upsert({
      user_id,
      id,
      note,
      title,
      description,
    });

    return updateNote;
  }

  async delete(id: string) {
    const existNote = await this.tasksRepository.findById(id);

    if (!existNote) throw new NoteNotFoundException();

    return this.tasksRepository.delete(id);
  }
}
