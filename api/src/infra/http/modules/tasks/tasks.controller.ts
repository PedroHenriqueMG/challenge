import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TasksUseCase } from 'src/modules/tasks/useCase/tasksUseCase';
import { TaskBody, TaskUpdateBody } from './dtos/taskBody';

@ApiTags('tasks')
@Controller('api/tasks')
export class TasksController {
  constructor(private tasksUseCase: TasksUseCase) {}

  @Post()
  async create(@Body() body: TaskBody) {
    const { title, description, position } = body;

    return await this.tasksUseCase.create({
      title,
      position,
      description,
    });
  }

  @Get()
  async getAll() {
    return await this.tasksUseCase.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.tasksUseCase.findOne(id);
  }

  @Patch(':id')
  async update(@Body() body: TaskUpdateBody, @Param('id') id: string) {
    const { title, description, stage, position } = body;

    return await this.tasksUseCase.update({
      id,
      title,
      position,
      description,
      stage,
    });
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    await this.tasksUseCase.delete(id);
  }
}
