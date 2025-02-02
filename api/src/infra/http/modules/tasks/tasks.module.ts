import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { TasksController } from './tasks.controller';
import { TasksUseCase } from 'src/modules/tasks/useCase/tasksUseCase';
import { TasksGateway } from 'src/modules/tasks/webSocket/tasks.gateway';

@Module({
  imports: [DatabaseModule],
  controllers: [TasksController],
  providers: [TasksUseCase, TasksGateway],
})
export class TasksModule {}
