import { Schema as MongooseSchema } from "mongoose";
export declare class Comment {
    _id: MongooseSchema.Types.ObjectId;
    blogId: MongooseSchema.Types.ObjectId;
    content: string;
    creatorId: MongooseSchema.Types.ObjectId;
}
export declare const CommentSchema: MongooseSchema<Comment, import("mongoose").Model<Comment, any, any, any, import("mongoose").Document<unknown, any, Comment, any> & Comment & Required<{
    _id: MongooseSchema.Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Comment, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Comment>, {}> & import("mongoose").FlatRecord<Comment> & Required<{
    _id: MongooseSchema.Types.ObjectId;
}> & {
    __v: number;
}>;
