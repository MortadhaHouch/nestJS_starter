import { Schema as MongooseSchema } from "mongoose";
export declare class Team {
    creator: MongooseSchema.Types.ObjectId;
    workspace: MongooseSchema.Types.ObjectId;
    members: MongooseSchema.Types.ObjectId[];
    discussions: MongooseSchema.Types.ObjectId[];
}
export declare const TeamSchema: MongooseSchema<Team, import("mongoose").Model<Team, any, any, any, import("mongoose").Document<unknown, any, Team, any> & Team & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Team, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Team>, {}> & import("mongoose").FlatRecord<Team> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
