/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private readonly taskModel:Model<Task>) {

  }
  create(createTaskDto: CreateTaskDto) {
    return this.taskModel.create(createTaskDto);
  }

  findAll() {
    return this.taskModel.find();
  }

  findOne(id: string) {
    return this.taskModel.findById(id);
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    return this.taskModel.findByIdAndUpdate(id, updateTaskDto);
  }

  remove(id: string) {
    return this.taskModel.findByIdAndDelete(id);
  }
}
