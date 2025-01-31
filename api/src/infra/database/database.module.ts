import { Module } from '@nestjs/common';
import { NoteRepository } from 'src/modules/note/repository/noteRepository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaNoteRepository } from './prisma/repositories/note/PrismaNoteRepository';

@Module({
  providers: [
    PrismaService,
    {
      provide: NoteRepository,
      useClass: PrismaNoteRepository,
    },
  ],
  exports: [NoteRepository],
})
export class DatabaseModule {}
