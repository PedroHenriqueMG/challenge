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

@WebSocketGateway()
export class TasksGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  constructor(private tasksRepository: TasksRepository) {}

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('TasksGateway');

  @SubscribeMessage('update task stage')
  handleMessage(client: Socket, payload: string): void {
    this.server.on('update task stage', (data) => {
      const { stage, position, taskId } = data;

      this.tasksRepository.updateTaskStage({
        id: taskId,
        stage,
        position,
      });
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
