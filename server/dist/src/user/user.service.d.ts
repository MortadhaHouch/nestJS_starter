import { BlogService } from './../blog/blog.service';
import { TeamService } from './../team/team.service';
import { TaskService } from './../task/task.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Model, ObjectId, Schema } from 'mongoose';
import { User } from './entities/user.entity';
import { WorkspaceService } from 'src/workspace/workspace.service';
import { CommentService } from 'src/comment/comment.service';
export declare class UserService {
    private readonly userModel;
    private readonly taskService;
    private readonly workspaceService;
    private readonly teamService;
    private readonly blogService;
    private readonly commentService;
    getFriends(_id: Schema.Types.ObjectId): Promise<(import("mongoose").Document<unknown, {}, User, {}> & User & Required<{
        _id: Schema.Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    private readonly userFields;
    constructor(userModel: Model<User>, taskService: TaskService, workspaceService: WorkspaceService, teamService: TeamService, blogService: BlogService, commentService: CommentService);
    getMyProfile(id: ObjectId): Promise<(import("mongoose").Document<unknown, {}, User, {}> & User & Required<{
        _id: Schema.Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    getUserProfile(id: ObjectId): Promise<{
        user: (import("mongoose").Document<unknown, {}, User, {}> & User & Required<{
            _id: Schema.Types.ObjectId;
        }> & {
            __v: number;
        }) | null;
        tasks: (import("mongoose").Document<unknown, {}, import("../task/entities/task.entity").Task, {}> & import("../task/entities/task.entity").Task & Required<{
            _id: Schema.Types.ObjectId;
        }> & {
            __v: number;
        })[] | {
            tasks: (import("mongoose").Document<unknown, {}, import("../task/entities/task.entity").Task, {}> & import("../task/entities/task.entity").Task & Required<{
                _id: Schema.Types.ObjectId;
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
            _id: Schema.Types.ObjectId;
        }> & {
            __v: number;
        })[] | {
            teams: (import("mongoose").Document<unknown, {}, import("../team/entities/team.entity").Team, {}> & import("../team/entities/team.entity").Team & Required<{
                _id: Schema.Types.ObjectId;
            }> & {
                __v: number;
            })[];
            count: number;
            page: number;
        };
        blogs: (import("mongoose").Document<unknown, {}, import("../blog/entities/blog.entity").Blog, {}> & import("../blog/entities/blog.entity").Blog & Required<{
            _id: Schema.Types.ObjectId;
        }> & {
            __v: number;
        })[];
        comments: (import("mongoose").Document<unknown, {}, import("../comment/entities/comment.entity").Comment, {}> & import("../comment/entities/comment.entity").Comment & Required<{
            _id: Schema.Types.ObjectId;
        }> & {
            __v: number;
        })[];
    }>;
    create(user: CreateUserDto): Promise<import("mongoose").Document<unknown, {}, User, {}> & User & Required<{
        _id: Schema.Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findUserByEmail(email: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, User, {}> & User & Required<{
        _id: Schema.Types.ObjectId;
    }> & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, User, {}> & User & Required<{
        _id: Schema.Types.ObjectId;
    }> & {
        __v: number;
    }, {}, User, "findOne", {}>;
    findById(id: ObjectId): import("mongoose").Query<(import("mongoose").Document<unknown, {}, User, {}> & User & Required<{
        _id: Schema.Types.ObjectId;
    }> & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, User, {}> & User & Required<{
        _id: Schema.Types.ObjectId;
    }> & {
        __v: number;
    }, {}, User, "findOne", {}>;
    hashPassword(password: string, salt?: number): Promise<string>;
    checkPassword(password: string, hash: string): Promise<boolean>;
    findUserByName({ firstName, lastName }: {
        firstName: string;
        lastName: string;
    }): Promise<(import("mongoose").Document<unknown, {}, User, {}> & User & Required<{
        _id: Schema.Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    findUserByNameOrEmail(id: ObjectId, { email, firstName, lastName }: Partial<{
        firstName: string;
        lastName: string;
        email: string;
    }>): Promise<(import("mongoose").Document<unknown, {}, User, {}> & User & Required<{
        _id: Schema.Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    findAllUsers(): Promise<(import("mongoose").Document<unknown, {}, User, {}> & User & Required<{
        _id: Schema.Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
}
