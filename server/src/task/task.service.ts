/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, RootFilterQuery } from 'mongoose';
import { Task } from './entities/task.entity';
import { TaskStatus } from 'utils/types';

@Injectable()
export class TaskService {
  private readonly taskFields = {
    title:1,
    description:1,
    status:1,
    priority:1,
    dueDate:1,
    creator:1,
    createdAt:1,
    updatedAt:1,
  }
  constructor(@InjectModel(Task.name) private readonly taskModel:Model<Task>) {

  }
  create(createTaskDto: CreateTaskDto) {
    return this.taskModel.create(createTaskDto);
  }

  async findAll(id:ObjectId,page?:number) {
    if(page){
      const [tasks,count] = await Promise.all([
        this.taskModel.find({creator:id}).populate("creator","firstName lastName email _id").populate("assignees","firstName lastName email _id").select(this.taskFields).skip(page ? (page-1)*10 : 0).limit(10),
        this.taskModel.countDocuments({creator:id})
      ])
      return {
        tasks,
        count,
        page:isNaN(Number(page))?1:Number(page)
      };
    }
    return this.taskModel.find({creator:id}).populate("creator","firstName lastName email _id").populate("assignees","firstName lastName email _id").select(this.taskFields);
  }

  async getUserTasks(creator: ObjectId, ids:ObjectId[]){
    const taskSearchP = ids.map((id) => this.taskModel.findOne({
      _id: id,
      creator
    }));
    const tasks = await Promise.all(taskSearchP);
    return tasks.flat();
  }
  async getTasksByDateRange(creator: ObjectId,createdAt?:Date,dateRange?:{from?:Date,to?:Date}){
    if(createdAt){
      const tasks = await this.taskModel.aggregate([
        { $match: { createdAt: { $gte: createdAt },creator } },
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
        { $match: { createdAt: dateQuery,creator } },
        { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, count: { $sum: 1 } } },
      ])
      return tasks;
    }
  }
  async findOverdueTasks(creator: ObjectId) {
    const query: RootFilterQuery<Task> = {
      overdue: { $lt: new Date() },
      status: { $ne: TaskStatus.DONE },
      creator
    };
    
    return this.taskModel.find(query).populate('creator', 'firstName lastName email').populate("assignees","firstName lastName email _id").select(this.taskFields);
  }

  async getTaskStats(creator: ObjectId) {
    const stats = await this.taskModel.aggregate([
      { $match: { creator } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    
    const total = await this.taskModel.countDocuments({ creator });
    const overdue = await this.taskModel.countDocuments({
      creator,
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

  findOne(creator: ObjectId, id: ObjectId) {
    return this.taskModel.findOne({
      _id: id,
      creator
    });
  }

  update(id: ObjectId, updateTaskDto: UpdateTaskDto) {
    return this.taskModel.findByIdAndUpdate(id, updateTaskDto, { new: true });
  }

  async remove(creator: ObjectId, id: ObjectId) {
    const deletedTask = await this.taskModel.deleteOne({
      _id: id,
      creator
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
