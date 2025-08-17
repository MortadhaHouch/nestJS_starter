import { CheckItem, TaskPriority, TaskStatus } from "utils/types";
import { Schema as MongooseSchema } from "mongoose";
export declare class Task {
    _id: MongooseSchema.Types.ObjectId;
    title: string;
    description: string;
    status: TaskStatus;
    overdue: Date;
    creator: MongooseSchema.Types.ObjectId;
    tags: string[];
    priority: TaskPriority;
    assignees: MongooseSchema.Types.ObjectId[];
    comments: string[];
    attachments: string[];
    checklist: CheckItem[];
    color: string;
    notes: string[];
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
