import { Schema as MongooseSchema } from "mongoose";
export declare class Blog {
    _id: MongooseSchema.Types.ObjectId;
    title: string;
    content: string;
    creator: MongooseSchema.Types.ObjectId;
    tags: string[];
    comments: MongooseSchema.Types.ObjectId[];
    likers: MongooseSchema.Types.ObjectId[];
    dislikers: MongooseSchema.Types.ObjectId[];
    views: number;
    bookmarks: MongooseSchema.Types.ObjectId[];
}
export declare const BlogSchema: MongooseSchema<Blog, import("mongoose").Model<Blog, any, any, any, import("mongoose").Document<unknown, any, Blog, any> & Blog & Required<{
    _id: MongooseSchema.Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Blog, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Blog>, {}> & import("mongoose").FlatRecord<Blog> & Required<{
    _id: MongooseSchema.Types.ObjectId;
}> & {
    __v: number;
}>;
