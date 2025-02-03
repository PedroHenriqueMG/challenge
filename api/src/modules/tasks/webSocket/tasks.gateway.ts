import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TasksRepository } from '../repository/tasksRepository';
import { Stage } from '@prisma/client';

interface PayloadSocket {
  stage: Stage;
  position: number;
  taskId: string;
}

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class TasksGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  constructor(private tasksRepository: TasksRepository) {}

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('TasksGateway');

  @SubscribeMessage('update task stage')
  async handleMessage(client: Socket, payload: PayloadSocket): Promise<void> {
    await this.tasksRepository.updateTaskStage({
      id: payload.taskId,
      stage: payload.stage,
      position: payload.position,
    });
  }

  afterInit(server: Server) {
    this.logger.log('Init socket');
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
}
