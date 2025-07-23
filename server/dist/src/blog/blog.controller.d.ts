import { NotFoundException } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { AuthenticatedRequest } from 'utils/types';
export declare class BlogController {
    private readonly blogService;
    constructor(blogService: BlogService);
    create(createBlogDto: CreateBlogDto, req: AuthenticatedRequest): Promise<import("mongoose").Document<unknown, {}, import("./entities/blog.entity").Blog, {}> & import("./entities/blog.entity").Blog & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findAll(tags?: string, p?: number): Promise<{
        results: any;
        count: any;
        p: number | undefined;
    }>;
    findOne(id: string, tags?: string, page?: number): Promise<{}>;
    update(id: string, updateBlogDto: UpdateBlogDto): Promise<(import("mongoose").Document<unknown, {}, import("./entities/blog.entity").Blog, {}> & import("./entities/blog.entity").Blog & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }) | NotFoundException | null>;
    remove(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./entities/blog.entity").Blog, {}> & import("./entities/blog.entity").Blog & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }) | NotFoundException>;
}
