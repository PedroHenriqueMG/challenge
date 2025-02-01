import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/exceptions/appException';

export class TaskNotFoundException extends AppException {
  constructor() {
    super({
      message: 'Tarefa não encontrada',
      status: HttpStatus.NOT_FOUND,
    });
  }
}
