import { Schema as MongooseSchema } from "mongoose";
export declare class Discussion {
    members: MongooseSchema.Types.ObjectId[];
    messages: MongooseSchema.Types.ObjectId[];
}
export declare const DiscussionSchema: MongooseSchema<Discussion, import("mongoose").Model<Discussion, any, any, any, import("mongoose").Document<unknown, any, Discussion, any> & Discussion & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Discussion, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Discussion>, {}> & import("mongoose").FlatRecord<Discussion> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
