import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthenticatedRequest } from 'utils/types';
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    create(id: string, createCommentDto: CreateCommentDto, req: AuthenticatedRequest): Promise<{
        comment: import("mongoose").Document<unknown, {}, import("./entities/comment.entity").Comment, {}> & import("./entities/comment.entity").Comment & Required<{
            _id: import("mongoose").Schema.Types.ObjectId;
        }> & {
            __v: number;
        };
        ok: boolean;
        creator: {
            firstName: string;
            lastName: string;
            email: string;
            _id: import("mongoose").Schema.Types.ObjectId;
        };
    }>;
    findAll(id: string): Promise<{
        comments: (import("mongoose").Document<unknown, {}, import("./entities/comment.entity").Comment, {}> & import("./entities/comment.entity").Comment & Required<{
            _id: import("mongoose").Schema.Types.ObjectId;
        }> & {
            __v: number;
        })[];
        ok: boolean;
    }>;
    update(id: string, updateCommentDto: UpdateCommentDto, req: AuthenticatedRequest): Promise<{
        comment: (import("mongoose").Document<unknown, {}, import("./entities/comment.entity").Comment, {}> & import("./entities/comment.entity").Comment & Required<{
            _id: import("mongoose").Schema.Types.ObjectId;
        }> & {
            __v: number;
        }) | null;
        ok: boolean;
        creator: {
            firstName: string;
            lastName: string;
            email: string;
            _id: import("mongoose").Schema.Types.ObjectId;
        };
    }>;
    remove(id: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./entities/comment.entity").Comment, {}> & import("./entities/comment.entity").Comment & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("./entities/comment.entity").Comment, {}> & import("./entities/comment.entity").Comment & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }, {}, import("./entities/comment.entity").Comment, "findOneAndDelete", {}>;
}
