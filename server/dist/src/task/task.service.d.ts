import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Model } from 'mongoose';
import { Task } from './entities/task.entity';
export declare class TaskService {
    private readonly taskModel;
    constructor(taskModel: Model<Task>);
    create(createTaskDto: CreateTaskDto): Promise<import("mongoose").Document<unknown, {}, Task, {}> & Task & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findAll(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, Task, {}> & Task & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, Task, {}> & Task & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, Task, "find", {}>;
    findOne(id: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, Task, {}> & Task & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, Task, {}> & Task & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, Task, "findOne", {}>;
    update(id: string, updateTaskDto: UpdateTaskDto): import("mongoose").Query<(import("mongoose").Document<unknown, {}, Task, {}> & Task & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, Task, {}> & Task & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, Task, "findOneAndUpdate", {}>;
    remove(id: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, Task, {}> & Task & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, Task, {}> & Task & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, Task, "findOneAndDelete", {}>;
}
