import { Schema as MongooseSchema } from "mongoose";
export declare class User {
    _id: MongooseSchema.Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    tasks: MongooseSchema.Types.ObjectId[];
    isLoggedIn: boolean;
    validationCode: number;
    latestLoginTrial: Date;
    ip: string;
    friends: MongooseSchema.Types.ObjectId[];
    notes: MongooseSchema.Types.ObjectId[];
    discussions: MongooseSchema.Types.ObjectId[];
}
export declare const UserSchema: MongooseSchema<User, import("mongoose").Model<User, any, any, any, import("mongoose").Document<unknown, any, User, any> & User & Required<{
    _id: MongooseSchema.Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<User>, {}> & import("mongoose").FlatRecord<User> & Required<{
    _id: MongooseSchema.Types.ObjectId;
}> & {
    __v: number;
}>;
