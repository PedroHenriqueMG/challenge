import { Injectable } from '@nestjs/common';
import { Tasks, TaskUpdateProps } from 'src/modules/tasks/entities/Tasks';
import { PrismaTasksMapper } from '../../mappers/tasks/PrismaTasksMapper';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class PrismaTasksRepository {
  constructor(private prisma: PrismaService) {}
  async upsert(tasks: Tasks) {
    const tasksRaw = PrismaTasksMapper.toCreate(tasks);

    const createTaks = await this.prisma.tasksModel.upsert({
      where: {
        id: tasksRaw.id,
      },
      update: {
        title: tasksRaw.title,
        description: tasksRaw.description,
      },
      create: {
        id: tasksRaw.id,
        title: tasksRaw.title,
        description: tasksRaw.description,
        stage: tasksRaw.stage,
        position: tasksRaw.position,
      },
    });

    return createTaks;
  }

  async findAll() {
    const allTasks = await this.prisma.tasksModel.findMany();

    return allTasks;
  }

  async findById(id: string) {
    const note = await this.prisma.tasksModel.findUnique({
      where: {
        id: id,
      },
    });

    return note;
  }

  async updateTaskStage(task: TaskUpdateProps): Promise<void> {
    await this.prisma.tasksModel.update({
      where: {
        id: task.id,
      },
      data: {
        stage: task.stage,
        position: task.position,
      },
    });
  }

  async delete(id: string) {
    const deleteNote = await this.prisma.tasksModel.delete({
      where: {
        id: id,
      },
    });

    return deleteNote;
  }
}
