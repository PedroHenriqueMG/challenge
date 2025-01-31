import { Module } from '@nestjs/common';
import { DatabaseModule } from './infra/database/database.module';
import { NoteModule } from './infra/http/modules/note/note.module';
@Module({
  imports: [
    DatabaseModule,
    NoteModule,
  ],
  controllers: [],
})
export class AppModule {}
