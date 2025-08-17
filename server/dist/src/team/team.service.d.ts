import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Model, ObjectId } from 'mongoose';
import { Team } from './entities/team.entity';
export declare class TeamService {
    private readonly teamModel;
    private readonly teamFields;
    constructor(teamModel: Model<Team>);
    addOrRemoveUser(id: string, creator: string): Promise<{
        team: import("mongoose").UpdateWriteOpResult;
        isAdded: boolean;
    }>;
    create(createTeamDto: CreateTeamDto, creator: ObjectId): Promise<import("mongoose").Document<unknown, {}, Team, {}> & Team & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findAll(creator: ObjectId, page?: number, search?: string): Promise<(import("mongoose").Document<unknown, {}, Team, {}> & Team & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    })[] | {
        teams: (import("mongoose").Document<unknown, {}, Team, {}> & Team & Required<{
            _id: import("mongoose").Schema.Types.ObjectId;
        }> & {
            __v: number;
        })[];
        count: number;
        page: number;
    }>;
    findOne(id: string, creator: ObjectId): Promise<{
        team: import("mongoose").Document<unknown, {}, Team, {}> & Team & Required<{
            _id: import("mongoose").Schema.Types.ObjectId;
        }> & {
            __v: number;
        };
        isAdmin: boolean;
    } | null>;
    update(id: string, creator: ObjectId, updateTeamDto: UpdateTeamDto): Promise<(import("mongoose").Document<unknown, {}, Team, {}> & Team & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    remove(id: string, creator: ObjectId): Promise<(import("mongoose").Document<unknown, {}, Team, {}> & Team & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
}
