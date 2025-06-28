/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { IsObjectIdPipe } from '@nestjs/mongoose';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body(ValidationPipe) createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id',IsObjectIdPipe) id: string) {
    return this.taskService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id',IsObjectIdPipe) id: string, @Body(ValidationPipe) updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id',IsObjectIdPipe) id: string) {
    return this.taskService.remove(id);
  }
}
