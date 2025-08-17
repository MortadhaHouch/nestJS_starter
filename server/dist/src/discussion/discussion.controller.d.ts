import { DiscussionService } from './discussion.service';
import { CreateDiscussionDto } from './dto/create-discussion.dto';
import { UpdateDiscussionDto } from './dto/update-discussion.dto';
export declare class DiscussionController {
    private readonly discussionService;
    constructor(discussionService: DiscussionService);
    create(createDiscussionDto: CreateDiscussionDto): Promise<import("mongoose").Document<unknown, {}, import("./entities/discussion.entity").Discussion, {}> & import("./entities/discussion.entity").Discussion & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./entities/discussion.entity").Discussion, {}> & import("./entities/discussion.entity").Discussion & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./entities/discussion.entity").Discussion, {}> & import("./entities/discussion.entity").Discussion & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    update(id: string, updateDiscussionDto: UpdateDiscussionDto): Promise<(import("mongoose").Document<unknown, {}, import("./entities/discussion.entity").Discussion, {}> & import("./entities/discussion.entity").Discussion & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    remove(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./entities/discussion.entity").Discussion, {}> & import("./entities/discussion.entity").Discussion & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
}
