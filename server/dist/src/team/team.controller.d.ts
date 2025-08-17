import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { AuthenticatedRequest } from 'utils/types';
import { Queue } from 'bullmq';
import { UserService } from 'src/user/user.service';
export declare class TeamController {
    private readonly teamService;
    private readonly userService;
    private readonly jobQueue;
    constructor(teamService: TeamService, userService: UserService, jobQueue: Queue);
    create(createTeamDto: CreateTeamDto, req: AuthenticatedRequest): Promise<import("mongoose").Document<unknown, {}, import("./entities/team.entity").Team, {}> & import("./entities/team.entity").Team & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findAll(req: AuthenticatedRequest, page?: number, search?: string): Promise<(import("mongoose").Document<unknown, {}, import("./entities/team.entity").Team, {}> & import("./entities/team.entity").Team & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    })[] | {
        teams: (import("mongoose").Document<unknown, {}, import("./entities/team.entity").Team, {}> & import("./entities/team.entity").Team & Required<{
            _id: import("mongoose").Schema.Types.ObjectId;
        }> & {
            __v: number;
        })[];
        count: number;
        page: number;
    }>;
    addOrRemoveUser(req: AuthenticatedRequest, id: string, creator: string): Promise<{
        team: import("mongoose").UpdateWriteOpResult;
        isAdded: boolean;
    }>;
    findOne(id: string, req: AuthenticatedRequest): Promise<{
        team: import("mongoose").Document<unknown, {}, import("./entities/team.entity").Team, {}> & import("./entities/team.entity").Team & Required<{
            _id: import("mongoose").Schema.Types.ObjectId;
        }> & {
            __v: number;
        };
        isAdmin: boolean;
    } | null>;
    update(id: string, req: AuthenticatedRequest, updateTeamDto: UpdateTeamDto): Promise<(import("mongoose").Document<unknown, {}, import("./entities/team.entity").Team, {}> & import("./entities/team.entity").Team & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    remove(id: string, req: AuthenticatedRequest): Promise<(import("mongoose").Document<unknown, {}, import("./entities/team.entity").Team, {}> & import("./entities/team.entity").Team & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
}
