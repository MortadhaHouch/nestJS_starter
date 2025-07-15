import { CreateUserDto } from './dto/create-user.dto';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    create(user: CreateUserDto): Promise<import("mongoose").Document<unknown, {}, User, {}> & User & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findUserByEmail(email: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, User, {}> & User & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, User, {}> & User & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }, {}, User, "findOne", {}>;
    hashPassword(password: string, salt?: number): Promise<string>;
    checkPassword(password: string, hash: string): Promise<boolean>;
    findUserByName({ firstName, lastName }: {
        firstName: string;
        lastName: string;
    }): Promise<(import("mongoose").Document<unknown, {}, User, {}> & User & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    findAllUsers(): Promise<(import("mongoose").Document<unknown, {}, User, {}> & User & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
}
