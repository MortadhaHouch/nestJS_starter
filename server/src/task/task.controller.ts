/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Req, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { IsObjectIdPipe } from '@nestjs/mongoose';
import { AuthenticatedRequest, TaskStatus } from 'utils/types';
import { ObjectId } from 'mongoose';

@Controller('task')
export class TaskController {
  constructor(
    private readonly taskService: TaskService
  ) {}

  @Post()
  create(@Body(ValidationPipe) createTaskDto: CreateTaskDto, @Req() req: AuthenticatedRequest) {
    const taskData = {
      ...createTaskDto,
      userId: (req.user as any)._id
    };
    return this.taskService.create(taskData);
  }

  @Get()
  findAll(
    @Req() req: AuthenticatedRequest,
    @Query("page") page?: string,
    @Query("limit") limit?: string,
    @Query("status") status?: string,
    @Query("sortBy") sortBy?: string,
    @Query("sortOrder") sortOrder?: 'asc' | 'desc',
    @Query("search") search?: string
  ) {
    const options = {
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 10,
      status: status as TaskStatus,
      userId: (req.user as any)._id,
      sortBy,
      sortOrder,
      search
    };
    
    return this.taskService.findAll(options);
  }

  @Get('overdue')
  findOverdue(@Req() req: AuthenticatedRequest) {
    return this.taskService.findOverdueTasks((req.user as any)._id);
  }

  @Get('stats')
  getStats(@Req() req: AuthenticatedRequest) {
    return this.taskService.getTaskStats((req.user as any)._id);
  }

  @Get(':id')
  findOne(@Req()req:AuthenticatedRequest, @Param('id',IsObjectIdPipe) id: ObjectId) {
    return this.taskService.findOne((req.user as any)._id, id);
  }
  @Patch(':id')
  update(@Param('id',IsObjectIdPipe) id: ObjectId, @Body(ValidationPipe) updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Req()req:AuthenticatedRequest, @Param('id',IsObjectIdPipe) id: ObjectId) {
    return this.taskService.remove((req.user as any)._id, id);
  }
}
