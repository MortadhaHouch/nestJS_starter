import { CreateDiscussionDto } from './dto/create-discussion.dto';
import { UpdateDiscussionDto } from './dto/update-discussion.dto';
import { Model } from 'mongoose';
import { Discussion } from './entities/discussion.entity';
export declare class DiscussionService {
    private discussionModel;
    constructor(discussionModel: Model<Discussion>);
    create(createDiscussionDto: CreateDiscussionDto): Promise<import("mongoose").Document<unknown, {}, Discussion, {}> & Discussion & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Discussion, {}> & Discussion & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<(import("mongoose").Document<unknown, {}, Discussion, {}> & Discussion & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    update(id: string, updateDiscussionDto: UpdateDiscussionDto): Promise<(import("mongoose").Document<unknown, {}, Discussion, {}> & Discussion & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    remove(id: string): Promise<(import("mongoose").Document<unknown, {}, Discussion, {}> & Discussion & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
}
