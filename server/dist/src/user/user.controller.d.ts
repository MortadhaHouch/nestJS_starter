import { UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { SignupUserDto } from './dto/signup-user.dto';
import { OPTCode } from './dto/otp-user.dto';
import { AuthenticatedRequest } from 'utils/types';
import { UpdateUserDto } from './dto/update-user.dto';
import { Queue } from 'bullmq';
import { Cache } from 'cache-manager';
import { ObjectId } from "mongoose";
export declare class UserController {
    private readonly userService;
    private readonly jwtService;
    private readonly notificationJob;
    private cacheManager;
    constructor(userService: UserService, jwtService: JwtService, notificationJob: Queue, cacheManager: Cache);
    findUsers(req: AuthenticatedRequest, email?: string, firstName?: string, lastName?: string): Promise<(import("mongoose").Document<unknown, {}, import("./entities/user.entity").User, {}> & import("./entities/user.entity").User & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getDashboardData(req: AuthenticatedRequest): Promise<{}>;
    getProfile(id: ObjectId): Promise<{
        user: (import("mongoose").Document<unknown, {}, import("./entities/user.entity").User, {}> & import("./entities/user.entity").User & Required<{
            _id: import("mongoose").Schema.Types.ObjectId;
        }> & {
            __v: number;
        }) | null;
        tasks: (import("mongoose").Document<unknown, {}, import("../task/entities/task.entity").Task, {}> & import("../task/entities/task.entity").Task & Required<{
            _id: import("mongoose").Schema.Types.ObjectId;
        }> & {
            __v: number;
        })[] | {
            tasks: (import("mongoose").Document<unknown, {}, import("../task/entities/task.entity").Task, {}> & import("../task/entities/task.entity").Task & Required<{
                _id: import("mongoose").Schema.Types.ObjectId;
            }> & {
                __v: number;
            })[];
            count: number;
            page: number;
        };
        workspaces: (import("mongoose").Document<unknown, {}, import("../workspace/entities/workspace.entity").Workspace, {}> & import("../workspace/entities/workspace.entity").Workspace & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        teams: (import("mongoose").Document<unknown, {}, import("../team/entities/team.entity").Team, {}> & import("../team/entities/team.entity").Team & Required<{
            _id: import("mongoose").Schema.Types.ObjectId;
        }> & {
            __v: number;
        })[] | {
            teams: (import("mongoose").Document<unknown, {}, import("../team/entities/team.entity").Team, {}> & import("../team/entities/team.entity").Team & Required<{
                _id: import("mongoose").Schema.Types.ObjectId;
            }> & {
                __v: number;
            })[];
            count: number;
            page: number;
        };
        blogs: (import("mongoose").Document<unknown, {}, import("../blog/entities/blog.entity").Blog, {}> & import("../blog/entities/blog.entity").Blog & Required<{
            _id: import("mongoose").Schema.Types.ObjectId;
        }> & {
            __v: number;
        })[];
        comments: (import("mongoose").Document<unknown, {}, import("../comment/entities/comment.entity").Comment, {}> & import("../comment/entities/comment.entity").Comment & Required<{
            _id: import("mongoose").Schema.Types.ObjectId;
        }> & {
            __v: number;
        })[];
    }>;
    getMyProfile(req: AuthenticatedRequest): Promise<{
        user: (import("mongoose").Document<unknown, {}, import("./entities/user.entity").User, {}> & import("./entities/user.entity").User & Required<{
            _id: import("mongoose").Schema.Types.ObjectId;
        }> & {
            __v: number;
        }) | null;
    }>;
    getFriends(req: AuthenticatedRequest): Promise<import("mongoose").Schema.Types.ObjectId[]>;
    login(user: LoginUserDto, ip: string): Promise<{
        success: string;
    }>;
    validate(opt: OPTCode): Promise<UnauthorizedException | {
        success: boolean;
        token: string;
        data: {
            email: string;
            firstName: string;
            lastName: string;
        };
    }>;
    resendOpt(user: OPTCode, ip: string): Promise<{
        success: boolean;
        retry_message: string;
    } | undefined>;
    signup(user: SignupUserDto): Promise<{
        token: string;
    }>;
    updatePassword(user: UpdateUserDto, req: AuthenticatedRequest): Promise<{
        success_message: string;
    }>;
    logout(req: AuthenticatedRequest): Promise<{
        success_message: string;
    }>;
}
