import { Injectable } from '@nestjs/common';
import { Tasks } from '../entities/Tasks';
import { TaskNotFoundException } from '../exceptions/TaskNotFound';
import { TasksRepository } from '../repository/tasksRepository';
import { Stage } from '@prisma/client';

interface TasksProps {
  title: string;
  description: string;
}

interface TasksUpdateProps {
  id: string;
  title: string;
  description: string;
  stage: Stage
}

@Injectable()
export class TasksUseCase {
  constructor(
    private tasksRepository: TasksRepository,
  ) {}

  async create({ title, description }: TasksProps) {
    const task = new Tasks({
      description,
      title,
    });
    const createTask = await this.tasksRepository.upsert(task);

    return createTask;
  }

  async findAll() {
    const allTasks = await this.tasksRepository.findAll();

    return allTasks;
  }

  async findOne(id: string) {
    const note = await this.tasksRepository.findById(id);

    if (!note) throw new TaskNotFoundException();

    return note;
  }

  async update({
    id,
    title,
    description,
    stage,
  }: TasksUpdateProps): Promise<Tasks | undefined> {
    const existNote = await this.tasksRepository.findById(id);

    if (!existNote) throw new TaskNotFoundException();

    const task = new Tasks({
      id,
      title,
      description,
      stage,
    });

    const updateNote = await this.tasksRepository.upsert(task);

    return updateNote;
  }

  async delete(id: string) {
    const existNote = await this.tasksRepository.findById(id);

    if (!existNote) throw new TaskNotFoundException();

    return this.tasksRepository.delete(id);
  }
}
