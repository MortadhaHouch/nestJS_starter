import { Schema as MongooseSchema } from 'mongoose';
import { WorkSpaceStatus } from 'utils/types';
export declare class Workspace {
    title: string;
    description: string;
    creator: MongooseSchema.Types.ObjectId;
    members: MongooseSchema.Types.ObjectId[];
    tasks: MongooseSchema.Types.ObjectId[];
    status: WorkSpaceStatus;
    tags: string[];
}
export declare const WorkspaceSchema: MongooseSchema<Workspace, import("mongoose").Model<Workspace, any, any, any, import("mongoose").Document<unknown, any, Workspace, any> & Workspace & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Workspace, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Workspace>, {}> & import("mongoose").FlatRecord<Workspace> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
