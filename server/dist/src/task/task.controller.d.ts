import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthenticatedRequest } from 'utils/types';
import { ObjectId } from 'mongoose';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    create(createTaskDto: CreateTaskDto, req: AuthenticatedRequest): Promise<import("mongoose").Document<unknown, {}, import("./entities/task.entity").Task, {}> & import("./entities/task.entity").Task & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findAll(req: AuthenticatedRequest, page?: string, limit?: string, status?: string, sortBy?: string, sortOrder?: 'asc' | 'desc', search?: string): Promise<{
        tasks: (import("mongoose").Document<unknown, {}, import("./entities/task.entity").Task, {}> & import("./entities/task.entity").Task & {
            _id: import("mongoose").Types.ObjectId;
        } & {
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
    findOverdue(req: AuthenticatedRequest): Promise<(import("mongoose").Document<unknown, {}, import("./entities/task.entity").Task, {}> & import("./entities/task.entity").Task & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getStats(req: AuthenticatedRequest): Promise<{
        total: number;
        overdue: number;
        byStatus: any;
    }>;
    findOne(req: AuthenticatedRequest, id: ObjectId): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./entities/task.entity").Task, {}> & import("./entities/task.entity").Task & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("./entities/task.entity").Task, {}> & import("./entities/task.entity").Task & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("./entities/task.entity").Task, "findOne", {}>;
    update(id: ObjectId, updateTaskDto: UpdateTaskDto): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./entities/task.entity").Task, {}> & import("./entities/task.entity").Task & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("./entities/task.entity").Task, {}> & import("./entities/task.entity").Task & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("./entities/task.entity").Task, "findOneAndUpdate", {}>;
    remove(req: AuthenticatedRequest, id: ObjectId): Promise<{
        deleted: boolean;
        id: import("mongoose").Schema.Types.ObjectId;
    }>;
}
