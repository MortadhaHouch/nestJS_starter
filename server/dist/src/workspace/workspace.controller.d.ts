import { WorkspaceService } from './workspace.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { AuthenticatedRequest, WorkSpaceStatus } from 'utils/types';
export declare class WorkspaceController {
    private readonly workspaceService;
    constructor(workspaceService: WorkspaceService);
    create(req: AuthenticatedRequest, createWorkspaceDto: CreateWorkspaceDto): Promise<import("mongoose").Document<unknown, {}, import("./entities/workspace.entity").Workspace, {}> & import("./entities/workspace.entity").Workspace & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findAll(req: AuthenticatedRequest, page?: string, limit?: string, search?: string, sort?: 'asc' | 'desc', sortParams?: string, status?: WorkSpaceStatus): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./entities/workspace.entity").Workspace, {}> & import("./entities/workspace.entity").Workspace & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, import("./entities/workspace.entity").Workspace, {}> & import("./entities/workspace.entity").Workspace & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("./entities/workspace.entity").Workspace, "find", {}>;
    findOne(id: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./entities/workspace.entity").Workspace, {}> & import("./entities/workspace.entity").Workspace & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("./entities/workspace.entity").Workspace, {}> & import("./entities/workspace.entity").Workspace & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("./entities/workspace.entity").Workspace, "findOne", {}>;
    update(id: string, updateWorkspaceDto: UpdateWorkspaceDto): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./entities/workspace.entity").Workspace, {}> & import("./entities/workspace.entity").Workspace & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("./entities/workspace.entity").Workspace, {}> & import("./entities/workspace.entity").Workspace & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("./entities/workspace.entity").Workspace, "findOneAndUpdate", {}>;
    remove(id: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./entities/workspace.entity").Workspace, {}> & import("./entities/workspace.entity").Workspace & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("./entities/workspace.entity").Workspace, {}> & import("./entities/workspace.entity").Workspace & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("./entities/workspace.entity").Workspace, "findOneAndDelete", {}>;
}
