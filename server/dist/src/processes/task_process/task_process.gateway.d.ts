import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { TaskProcessService } from './task_process.service';
import { CreateTaskDto } from 'src/task/dto/create-task.dto';
import { UpdateTaskDto } from 'src/task/dto/update-task.dto';
import { Server, Socket } from "socket.io";
export declare class TaskProcessGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly taskProcessService;
    constructor(taskProcessService: TaskProcessService);
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    server: Server;
    create(createTaskDto: CreateTaskDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(updateTaskDto: UpdateTaskDto): UpdateTaskDto;
    remove(id: string): string;
}
