import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    create(createTaskDto: CreateTaskDto): Promise<import("mongoose").Document<unknown, {}, import("./entities/task.entity").Task, {}> & import("./entities/task.entity").Task & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findAll(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./entities/task.entity").Task, {}> & import("./entities/task.entity").Task & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, import("./entities/task.entity").Task, {}> & import("./entities/task.entity").Task & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("./entities/task.entity").Task, "find", {}>;
    findOne(id: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./entities/task.entity").Task, {}> & import("./entities/task.entity").Task & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("./entities/task.entity").Task, {}> & import("./entities/task.entity").Task & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("./entities/task.entity").Task, "findOne", {}>;
    update(id: string, updateTaskDto: UpdateTaskDto): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./entities/task.entity").Task, {}> & import("./entities/task.entity").Task & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("./entities/task.entity").Task, {}> & import("./entities/task.entity").Task & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("./entities/task.entity").Task, "findOneAndUpdate", {}>;
    remove(id: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./entities/task.entity").Task, {}> & import("./entities/task.entity").Task & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("./entities/task.entity").Task, {}> & import("./entities/task.entity").Task & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("./entities/task.entity").Task, "findOneAndDelete", {}>;
}
