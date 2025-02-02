import { Tasks } from 'src/modules/tasks/entities/Tasks';

export class PrismaTasksMapper {
  static toCreate({ description, id, title, stage, position }: Tasks) {
    return {
      description,
      title,
      position,
      stage,
      id,
    };
  }
}
