import { Module } from '@nestjs/common';
import { DatabaseModule } from './infra/database/database.module';
import { TasksModule } from './infra/http/modules/tasks/tasks.module';
@Module({
  imports: [
    DatabaseModule,
    TasksModule,
  ],
  controllers: [],
})
export class AppModule {}
