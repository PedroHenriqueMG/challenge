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

  @IsNotEmptyCustom()
  position: number;
}

export class TaskUpdateBody {
  title: string;
  description: string;
  stage: Stage;
  position: number;
}
