import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Model, ObjectId } from 'mongoose';
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
export declare class TaskService {
    private readonly taskModel;
    constructor(taskModel: Model<Task>);
    create(createTaskDto: CreateTaskDto): Promise<import("mongoose").Document<unknown, {}, Task, {}> & Task & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findAll(options?: FindAllOptions): Promise<{
        tasks: (import("mongoose").Document<unknown, {}, Task, {}> & Task & Required<{
            _id: import("mongoose").Schema.Types.ObjectId;
        }> & {
            __v: number;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }>;
    getUserTasks(userId: ObjectId, ids: ObjectId[]): Promise<((import("mongoose").Document<unknown, {}, Task, {}> & Task & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }) | null)[]>;
    getTasksByDateRange(userId: ObjectId, createdAt?: Date, dateRange?: {
        from?: Date;
        to?: Date;
    }): Promise<any[] | undefined>;
    findOverdueTasks(userId: ObjectId): Promise<(import("mongoose").Document<unknown, {}, Task, {}> & Task & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getTaskStats(userId: ObjectId): Promise<{
        total: number;
        overdue: number;
        byStatus: any;
    }>;
    findOne(userId: ObjectId, id: ObjectId): import("mongoose").Query<(import("mongoose").Document<unknown, {}, Task, {}> & Task & Required<{
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
    remove(userId: ObjectId, id: ObjectId): Promise<{
        deleted: boolean;
        id: import("mongoose").Schema.Types.ObjectId;
    }>;
}
export {};
