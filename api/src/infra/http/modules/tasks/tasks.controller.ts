import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { TasksUseCase } from 'src/modules/tasks/useCase/tasksUseCase';
import { NoteBody } from './dtos/noteBody';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('notes')
@Controller('notes')
export class TasksController {
  constructor(private tasksUseCase: TasksUseCase) {}

  @Post()
  async createNote(
    @Body() body: NoteBody,
    @Request() req,
  ) {
    const { note, title, description } = body;

    return this.tasksUseCase.create({
      user_id: req.user.id,
      user_email: req.user.email,
      note,
      title,
      description,
    });
  }

  @Get()
  async getAll(@Request() req) {
    const user_id = req.user.id;

    return this.tasksUseCase.findAll(user_id);
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.tasksUseCase.findOne(id);
  }

  @Put(':id')
  async update(
    @Body() body: NoteBody,
    @Param('id') id: string,
    @Request() req,
  ) {
    const { note, title, description } = body;
    const user_id = req.user.id;

    return this.tasksUseCase.update({
      user_id,
      id,
      note,
      title,
      description,
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.tasksUseCase.delete(id);
  }
}
