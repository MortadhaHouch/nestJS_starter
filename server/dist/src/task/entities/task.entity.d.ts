import { TaskPriority, TaskStatus } from "utils/types";
import { Schema as MongooseSchema } from "mongoose";
export declare class Task {
    _id: MongooseSchema.Types.ObjectId;
    title: string;
    description: string;
    status: TaskStatus;
    overdue: Date;
    userId: MongooseSchema.Types.ObjectId;
    tags: string[];
    priority: TaskPriority;
}
export declare const TaskSchema: MongooseSchema<Task, import("mongoose").Model<Task, any, any, any, import("mongoose").Document<unknown, any, Task, any> & Task & Required<{
    _id: MongooseSchema.Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Task, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Task>, {}> & import("mongoose").FlatRecord<Task> & Required<{
    _id: MongooseSchema.Types.ObjectId;
}> & {
    __v: number;
}>;
