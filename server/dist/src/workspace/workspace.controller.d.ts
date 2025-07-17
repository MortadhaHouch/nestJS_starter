import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { AuthenticatedRequest, WorkSpaceStatus } from 'utils/types';
import { AddUsersDto } from './dto/add-users.dto';
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
    findOne(req: AuthenticatedRequest, id: string): Promise<(import("mongoose").Document<unknown, {}, import("./entities/workspace.entity").Workspace, {}> & import("./entities/workspace.entity").Workspace & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    update(id: string, updateWorkspaceDto: UpdateWorkspaceDto, req: AuthenticatedRequest): Promise<NotFoundException | import("mongoose").UpdateWriteOpResult>;
    joinWorkspace(id: string, req: AuthenticatedRequest, userIds: AddUsersDto): Promise<NotFoundException | import("mongoose").UpdateWriteOpResult>;
    remove(id: string, req: AuthenticatedRequest): Promise<UnauthorizedException | import("mongodb").DeleteResult>;
}
