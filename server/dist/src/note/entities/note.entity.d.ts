import { Schema as MongooseSchema } from "mongoose";
export declare class Note {
    _id: MongooseSchema.Types.ObjectId;
    title: string;
    content: string;
    d: any;
    userId: MongooseSchema.Types.ObjectId;
}
export declare const NoteSchema: MongooseSchema<Note, import("mongoose").Model<Note, any, any, any, import("mongoose").Document<unknown, any, Note, any> & Note & Required<{
    _id: MongooseSchema.Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Note, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Note>, {}> & import("mongoose").FlatRecord<Note> & Required<{
    _id: MongooseSchema.Types.ObjectId;
}> & {
    __v: number;
}>;
