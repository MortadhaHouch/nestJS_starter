/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, RootFilterQuery } from 'mongoose';
import { Task } from './entities/task.entity';
import { TaskStatus } from 'utils/types';

interface FindAllOptions {
  page?: number;
  limit?: number;
  status?: TaskStatus;
  userId?: ObjectId;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
}

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private readonly taskModel:Model<Task>) {

  }
  create(createTaskDto: CreateTaskDto) {
    return this.taskModel.create(createTaskDto);
  }

  async findAll(options: FindAllOptions = {}) {
    try {
      const {
        page = 1,
        limit = 10,
        status,
        userId,
        sortBy = 'createdAt',
        sortOrder = 'desc',
        search
      } = options;
      if (page < 1 || limit < 1 || limit > 100) {
        throw new BadRequestException('Invalid pagination parameters');
      }
      const query: RootFilterQuery<Task> = {};
      query.userId = userId;
      if (status) {
        query.status = status;
      }
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ];
      }
      
      const sort: any = {};
      sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

      const skip = (page - 1) * limit;
      
      const [tasks, total] = await Promise.all([
        this.taskModel
          .find(query)
          .sort(sort)
          .skip(skip)
          .limit(limit)
          .populate('userId', 'firstName lastName email')
          .exec(),
        this.taskModel.countDocuments(query)
      ]);

      return {
        tasks,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1
        }
      };
    } catch (error) {
      throw new BadRequestException(`Failed to fetch tasks: ${error.message}`);
    }
  }

  async getUserTasks(userId: ObjectId, ids:ObjectId[]){
    const taskSearchP = ids.map((id) => this.taskModel.findOne({
      _id: id,
      userId
    }));
    const tasks = await Promise.all(taskSearchP);
    return tasks.flat();
  }
  async getTasksByDateRange(userId: ObjectId,createdAt?:Date,dateRange?:{from?:Date,to?:Date}){
    if(createdAt){
      const tasks = await this.taskModel.aggregate([
        { $match: { createdAt: { $gte: createdAt },userId } },
        { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, count: { $sum: 1 } } },
      ])
      return tasks;
    }
    if(dateRange){
      const dateQuery:Record<string,Date> = {}
      if(dateRange.from){
        dateQuery.$gte = dateRange.from;
      }
      if(dateRange.to){
        dateQuery.$lte = dateRange.to;
      }
      const tasks = await this.taskModel.aggregate([
        { $match: { createdAt: dateQuery,userId } },
        { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, count: { $sum: 1 } } },
      ])
      return tasks;
    }
  }
  async findOverdueTasks(userId: ObjectId) {
    const query: RootFilterQuery<Task> = {
      overdue: { $lt: new Date() },
      status: { $ne: TaskStatus.DONE },
      userId
    };
    
    return this.taskModel.find(query).populate('userId', 'firstName lastName email');
  }

  async getTaskStats(userId: ObjectId) {
    const stats = await this.taskModel.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    
    const total = await this.taskModel.countDocuments({ userId });
    const overdue = await this.taskModel.countDocuments({
      userId,
      overdue: { $lt: new Date() },
      status: { $ne: TaskStatus.DONE }
    });
    
    return {
      total,
      overdue,
      byStatus: stats.reduce((acc: Record<string, number>, stat) => {
        acc[stat._id] = stat.count;
        return acc;
      }, {})
    };
  }

  findOne(userId: ObjectId, id: ObjectId) {
    return this.taskModel.findOne({
      _id: id,
      userId
    });
  }

  update(id: ObjectId, updateTaskDto: UpdateTaskDto) {
    return this.taskModel.findByIdAndUpdate(id, updateTaskDto, { new: true });
  }

  async remove(userId: ObjectId, id: ObjectId) {
    const deletedTask = await this.taskModel.deleteOne({
      _id: id,
      userId
    });
    if(deletedTask){
      return {
        deleted: true,
        id
      }
    }
    throw new NotFoundException('Task not found');
  }
}
