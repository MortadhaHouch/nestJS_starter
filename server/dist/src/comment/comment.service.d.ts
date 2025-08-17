import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Model, ObjectId } from 'mongoose';
import { Comment } from './entities/comment.entity';
import { BlogService } from 'src/blog/blog.service';
export declare class CommentService {
    private readonly commentModel;
    private readonly blogService;
    private readonly commentFields;
    constructor(commentModel: Model<Comment>, blogService: BlogService);
    create(blogId: string, creatorId: ObjectId, createCommentDto: CreateCommentDto): Promise<import("mongoose").Document<unknown, {}, Comment, {}> & Comment & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findAll(id: string): Promise<(import("mongoose").Document<unknown, {}, Comment, {}> & Comment & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    findMyComments(creator: ObjectId): Promise<(import("mongoose").Document<unknown, {}, Comment, {}> & Comment & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<(import("mongoose").Document<unknown, {}, Comment, {}> & Comment & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    update(id: string, updateCommentDto: UpdateCommentDto): import("mongoose").Query<(import("mongoose").Document<unknown, {}, Comment, {}> & Comment & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, Comment, {}> & Comment & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }, {}, Comment, "findOneAndUpdate", {}>;
    remove(id: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, Comment, {}> & Comment & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, Comment, {}> & Comment & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }, {}, Comment, "findOneAndDelete", {}>;
}
