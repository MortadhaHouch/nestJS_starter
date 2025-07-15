import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { Workspace } from './entities/workspace.entity';
import { Model, ObjectId } from 'mongoose';
import { WorkSpaceStatus } from 'utils/types';
export declare class WorkspaceService {
    private readonly workspaceModel;
    constructor(workspaceModel: Model<Workspace>);
    create(createWorkspaceDto: CreateWorkspaceDto, id: string): Promise<import("mongoose").Document<unknown, {}, Workspace, {}> & Workspace & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findAll(id: string, p?: number, limit?: number, search?: string, sortOrder?: 'asc' | 'desc', sortParams?: string, status?: WorkSpaceStatus): import("mongoose").Query<(import("mongoose").Document<unknown, {}, Workspace, {}> & Workspace & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, Workspace, {}> & Workspace & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, Workspace, "find", {}>;
    findOne(id: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, Workspace, {}> & Workspace & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, Workspace, {}> & Workspace & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, Workspace, "findOne", {}>;
    update(id: string, updateWorkspaceDto: UpdateWorkspaceDto): import("mongoose").Query<import("mongoose").UpdateWriteOpResult, import("mongoose").Document<unknown, {}, Workspace, {}> & Workspace & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, Workspace, "updateOne", {}>;
    findAccessible(id: string, userId: ObjectId): import("mongoose").Query<(import("mongoose").Document<unknown, {}, Workspace, {}> & Workspace & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, Workspace, {}> & Workspace & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, Workspace, "findOne", {}>;
    findMyWorkspace(id: string, creatorId: ObjectId): import("mongoose").Query<(import("mongoose").Document<unknown, {}, Workspace, {}> & Workspace & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, Workspace, {}> & Workspace & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, Workspace, "findOne", {}>;
    remove(id: string): import("mongoose").Query<import("mongodb").DeleteResult, import("mongoose").Document<unknown, {}, Workspace, {}> & Workspace & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, Workspace, "deleteOne", {}>;
}
