import { Tasks } from 'src/modules/tasks/entities/Tasks';

export class PrismaTasksMapper {
  static toCreate({ description, id, title, stage }: Tasks) {
    return {
      description,
      title,
      stage,
      id,
    };
  }
}
