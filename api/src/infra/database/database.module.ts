import { Module } from '@nestjs/common';
import { TasksRepository } from 'src/modules/tasks/repository/tasksRepository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaTasksRepository } from './prisma/repositories/tasks/PrismaTaskRepository';

@Module({
  providers: [
    PrismaService,
    {
      provide: TasksRepository,
      useClass: PrismaTasksRepository,
    },
  ],
  exports: [TasksRepository],
})
export class DatabaseModule {}
