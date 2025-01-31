import { Injectable } from '@nestjs/common';
import { Note } from 'src/modules/tasks/entities/Note';
import { PrismaNotesMapper } from '../../mappers/notes/PrismaNotesMapper';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class PrismaTasksRepository {
  constructor(private prisma: PrismaService) {}
  async upsert(notes: Note) {
    const noteRaw = PrismaNotesMapper.toCreate(notes);

    const createNote = await this.prisma.tasks.upsert({
      where: {
        id: noteRaw.id,
      },
      update: {
        title: noteRaw.title,
        description: noteRaw.description,
        note: noteRaw.note,
      },
      create: {
        id: noteRaw.id,
        user_id: noteRaw.user_id,
        title: noteRaw.title,
        note: noteRaw.note,
        description: noteRaw.description,
      },
    });

    return createNote;
  }

  async findAll(user_id: string) {
    const allNotes = await this.prisma.tasks.findMany({
      where: {
        user_id: user_id,
      },
    });

    return allNotes;
  }

  async findById(id: string) {
    const note = await this.prisma.tasks.findUnique({
      where: {
        id: id,
      },
    });

    return note;
  }

  async delete(id: string) {
    const deleteNote = await this.prisma.tasks.delete({
      where: {
        id: id,
      },
    });

    return deleteNote;
  }
}
