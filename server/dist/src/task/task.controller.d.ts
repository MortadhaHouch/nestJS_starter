import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthenticatedRequest } from 'utils/types';
import { ObjectId } from 'mongoose';
import { Cache } from 'cache-manager';
export declare class TaskController {
    private readonly taskService;
    private cacheManager;
    constructor(taskService: TaskService, cacheManager: Cache);
    create(createTaskDto: CreateTaskDto, req: AuthenticatedRequest): Promise<import("mongoose").Document<unknown, {}, import("./entities/task.entity").Task, {}> & import("./entities/task.entity").Task & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findAll(req: AuthenticatedRequest, page?: string, limit?: string, status?: string, sortBy?: string, sortOrder?: 'asc' | 'desc', search?: string): Promise<{}>;
    findOverdue(req: AuthenticatedRequest): Promise<(import("mongoose").Document<unknown, {}, import("./entities/task.entity").Task, {}> & import("./entities/task.entity").Task & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getStats(req: AuthenticatedRequest): Promise<{}>;
    findOne(req: AuthenticatedRequest, id: ObjectId): Promise<{} | null>;
    update(req: AuthenticatedRequest, id: ObjectId, updateTaskDto: UpdateTaskDto): Promise<(import("mongoose").Document<unknown, {}, import("./entities/task.entity").Task, {}> & import("./entities/task.entity").Task & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    remove(req: AuthenticatedRequest, id: ObjectId): Promise<{
        message: string;
        success: boolean;
        error?: undefined;
    } | {
        error: string;
        success: boolean;
        message?: undefined;
    }>;
}
