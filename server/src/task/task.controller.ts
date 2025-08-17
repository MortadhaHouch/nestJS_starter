/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Req, Query, Inject } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { IsObjectIdPipe } from '@nestjs/mongoose';
import { AuthenticatedRequest } from 'utils/types';
import { ObjectId } from 'mongoose';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
@Controller('task')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  @Post()
  create(@Body(ValidationPipe) createTaskDto: CreateTaskDto, @Req() req: AuthenticatedRequest) {
    const taskData = {
      ...createTaskDto,
      creator: req.user._id
    };
    return this.taskService.create(taskData);
  }

  @Get()
  async findAll(
    @Req() req: AuthenticatedRequest,
    @Query("page") page?: number,
  ) {
    const cacheKey = `${req.user.firstName}_${req.user.lastName}_all_tasks`;
    const cachedTasks = await this.cacheManager.get(cacheKey);
    if(cachedTasks){
      console.log("cache hit");
      return cachedTasks;
    }
    console.log("cache miss");
    const tasks = await this.taskService.findAll(req.user._id,page);
    await this.cacheManager.set(cacheKey,tasks);
    return tasks;
  }

  @Get('overdue')
  findOverdue(@Req() req: AuthenticatedRequest) {
    return this.taskService.findOverdueTasks(req.user._id);
  }

  @Get('stats')
  async getStats(
    @Req() req: AuthenticatedRequest,
    @Query("createdAt") createdAt?: Date,
    @Query("from") from?: Date,
    @Query("to") to?: Date,
  ) {
    const cacheKey = `${req.user.firstName}_${req.user.lastName}_stats`;
    const cachedTasks = await this.cacheManager.get(cacheKey);
    if(cachedTasks){
      return cachedTasks;
    }
    const tasks = await this.taskService.getTasksByDateRange(req.user._id,createdAt,{from,to});
    await this.cacheManager.set(cacheKey,tasks);
    return tasks;
  }

  @Get(':id')
  async findOne(@Req()req:AuthenticatedRequest, @Param('id',IsObjectIdPipe) id: ObjectId) {
    const cacheKey = `${req.user.firstName}_${req.user.lastName}_${id as any}`;
    const foundTask = await this.cacheManager.get(cacheKey);
    if(foundTask){
      return foundTask;
    }
    const task = await this.taskService.findOne(req.user._id, id);
    await this.cacheManager.set(cacheKey,task);
    return task;
  }
  @Patch(':id')
  async update(
    @Req() req:AuthenticatedRequest,
    @Param('id',IsObjectIdPipe) id: ObjectId, 
    @Body(ValidationPipe) updateTaskDto: UpdateTaskDto
  ) {
    const updatedTask = await this.taskService.update(id, updateTaskDto);
    const cacheKey = `${req.user.firstName}_${req.user.lastName}_${id as any}`;
    const cachedTask = await this.cacheManager.get(cacheKey);
    if(cachedTask){
      await this.cacheManager.set(cacheKey,updatedTask);
    }
    return updatedTask;
  }

  @Delete(':id')
  async remove(@Req()req:AuthenticatedRequest, @Param('id',IsObjectIdPipe) id: ObjectId) {
    const promises = await Promise.allSettled([
      this.taskService.remove(req.user._id,id),
      this.cacheManager.del(`${req.user.firstName}_${req.user.lastName}_${id as any}`)
    ])
    if(promises.every((p)=>p.status == "fulfilled")){
      return {
        message:"task successfully deleted",
        success:true
      }
    }
    return {
      error:"error deleting the task",
      success:false
    }
  }
}
