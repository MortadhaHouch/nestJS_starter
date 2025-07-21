/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from 'src/task/dto/create-task.dto';
import { UpdateTaskDto } from 'src/task/dto/update-task.dto';

@Injectable()
export class TaskProcessService {
  create(createTaskDto: CreateTaskDto) {
    return 'This action adds a new taskProcess';
  }

  findAll() {
    return `This action returns all taskProcess`;
  }

  findOne(id: string) {
    return `This action returns a #${id} taskProcess`;
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    return updateTaskDto;
  }

  remove(id: string) {
    return `This action removes a #${id} taskProcess`;
  }
}
