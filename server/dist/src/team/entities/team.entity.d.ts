import { Schema as MongooseSchema } from "mongoose";
export declare class Team {
    _id: MongooseSchema.Types.ObjectId;
    creator: MongooseSchema.Types.ObjectId;
    name: string;
    description: string;
    workspaces: MongooseSchema.Types.ObjectId[];
    members: MongooseSchema.Types.ObjectId[];
    discussions: MongooseSchema.Types.ObjectId[];
}
export declare const TeamSchema: MongooseSchema<Team, import("mongoose").Model<Team, any, any, any, import("mongoose").Document<unknown, any, Team, any> & Team & Required<{
    _id: MongooseSchema.Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Team, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Team>, {}> & import("mongoose").FlatRecord<Team> & Required<{
    _id: MongooseSchema.Types.ObjectId;
}> & {
    __v: number;
}>;
