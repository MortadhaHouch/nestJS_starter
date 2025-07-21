import { CreateTaskDto } from 'src/task/dto/create-task.dto';
import { UpdateTaskDto } from 'src/task/dto/update-task.dto';
export declare class TaskProcessService {
    create(createTaskDto: CreateTaskDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateTaskDto: UpdateTaskDto): UpdateTaskDto;
    remove(id: string): string;
}
