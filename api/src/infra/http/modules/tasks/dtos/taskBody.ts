import { ApiProperty } from '@nestjs/swagger';
import { Stage } from '@prisma/client';
import { IsNotEmptyCustom } from 'src/infra/http/classValidator/decorators/IsNotEmptyCustom';

export class TaskBody {
  @IsNotEmptyCustom()
  @ApiProperty()
  title: string;

  @IsNotEmptyCustom()
  @ApiProperty()
  description: string;
}

export class TaskUpdateBody {
  title: string;
  description: string;
  stage: Stage;
}
