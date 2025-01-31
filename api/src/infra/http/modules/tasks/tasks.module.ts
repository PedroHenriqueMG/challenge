import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { TasksController } from './tasks.controller';
import { TasksUseCase } from 'src/modules/tasks/useCase/tasksUseCase';

@Module({
  imports: [DatabaseModule],
  controllers: [TasksController],
  providers: [TasksUseCase],
})
export class TasksModule {}
