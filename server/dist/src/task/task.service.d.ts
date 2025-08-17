import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Model, ObjectId } from 'mongoose';
import { Task } from './entities/task.entity';
export declare class TaskService {
    private readonly taskModel;
    private readonly taskFields;
    constructor(taskModel: Model<Task>);
    create(createTaskDto: CreateTaskDto): Promise<import("mongoose").Document<unknown, {}, Task, {}> & Task & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findAll(id: ObjectId, page?: number): Promise<(import("mongoose").Document<unknown, {}, Task, {}> & Task & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    })[] | {
        tasks: (import("mongoose").Document<unknown, {}, Task, {}> & Task & Required<{
            _id: import("mongoose").Schema.Types.ObjectId;
        }> & {
            __v: number;
        })[];
        count: number;
        page: number;
    }>;
    getUserTasks(creator: ObjectId, ids: ObjectId[]): Promise<((import("mongoose").Document<unknown, {}, Task, {}> & Task & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }) | null)[]>;
    getTasksByDateRange(creator: ObjectId, createdAt?: Date, dateRange?: {
        from?: Date;
        to?: Date;
    }): Promise<any[] | undefined>;
    findOverdueTasks(creator: ObjectId): Promise<(import("mongoose").Document<unknown, {}, Task, {}> & Task & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getTaskStats(creator: ObjectId): Promise<{
        total: number;
        overdue: number;
        byStatus: any;
    }>;
    findOne(creator: ObjectId, id: ObjectId): import("mongoose").Query<(import("mongoose").Document<unknown, {}, Task, {}> & Task & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, Task, {}> & Task & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }, {}, Task, "findOne", {}>;
    update(id: ObjectId, updateTaskDto: UpdateTaskDto): import("mongoose").Query<(import("mongoose").Document<unknown, {}, Task, {}> & Task & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, Task, {}> & Task & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }, {}, Task, "findOneAndUpdate", {}>;
    remove(creator: ObjectId, id: ObjectId): Promise<{
        deleted: boolean;
        id: import("mongoose").Schema.Types.ObjectId;
    }>;
}
