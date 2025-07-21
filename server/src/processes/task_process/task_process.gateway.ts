/* eslint-disable prettier/prettier */
import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { TaskProcessService } from './task_process.service';
import { CreateTaskDto } from 'src/task/dto/create-task.dto';
import { UpdateTaskDto } from 'src/task/dto/update-task.dto';
import { Server, Socket } from "socket.io";
@WebSocketGateway(3001)
export class TaskProcessGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly taskProcessService: TaskProcessService,
  ) {}
  handleConnection(client: Socket): void {
    this.server.emit('room', client.id + ' joined!')
    console.log("client connected", client.id);
  }

  handleDisconnect(client: Socket): void {
    this.server.emit('room', client.id + ' left!')
    console.log("client disconnected");
  }
  @WebSocketServer()
  server: Server;
  @SubscribeMessage('add-task')
  create(@MessageBody() createTaskDto: CreateTaskDto) {
    return this.taskProcessService.create(createTaskDto);
  }

  @SubscribeMessage('find-all')
  findAll() {
    return this.taskProcessService.findAll();
  }

  @SubscribeMessage('find-one')
  findOne(@MessageBody() id: string) {
    return this.taskProcessService.findOne(id);
  }

  @SubscribeMessage('update-task')
  update(@MessageBody() updateTaskDto: UpdateTaskDto) {
    return updateTaskDto;
  }

  @SubscribeMessage('remove-task')
  remove(@MessageBody() id: string) {
    return this.taskProcessService.remove(id);
  }
}
