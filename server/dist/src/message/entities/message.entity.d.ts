import { Schema as MongooseSchema } from "mongoose";
export declare class Message {
    _id: MongooseSchema.Types.ObjectId;
    sender: MongooseSchema.Types.ObjectId;
    receiver: MongooseSchema.Types.ObjectId;
    message: string;
}
export declare const MessageSchema: MongooseSchema<Message, import("mongoose").Model<Message, any, any, any, import("mongoose").Document<unknown, any, Message, any> & Message & Required<{
    _id: MongooseSchema.Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Message, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Message>, {}> & import("mongoose").FlatRecord<Message> & Required<{
    _id: MongooseSchema.Types.ObjectId;
}> & {
    __v: number;
}>;
