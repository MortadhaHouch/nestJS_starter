import { Task } from 'src/task/entities/task.entity';
import { Schema as MongooseSchema } from "mongoose";
export declare class User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    tasks: Task[];
    isLoggedIn: boolean;
}
export declare const UserSchema: MongooseSchema<User, import("mongoose").Model<User, any, any, any, import("mongoose").Document<unknown, any, User, any> & User & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<User>, {}> & import("mongoose").FlatRecord<User> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
