import { NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Model, ObjectId } from 'mongoose';
import { Blog } from './entities/blog.entity';
export declare class BlogService {
    private readonly blogModel;
    constructor(blogModel: Model<Blog>);
    create(userId: ObjectId, createBlogDto: CreateBlogDto): Promise<import("mongoose").Document<unknown, {}, Blog, {}> & Blog & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findAll(p?: number, tags?: string): Promise<{
        results: any;
        count: any;
        p: number | undefined;
    }>;
    getStats(createdAt?: string, dateRange?: {
        from: Date;
        to: Date;
    }): Promise<{
        results: any[];
        count: number;
    } | undefined>;
    findOne(id: string, tags?: string, p?: number): Promise<{}>;
    update(id: string, updateBlogDto: UpdateBlogDto): Promise<(import("mongoose").Document<unknown, {}, Blog, {}> & Blog & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }) | NotFoundException | null>;
    remove(id: string): Promise<(import("mongoose").Document<unknown, {}, Blog, {}> & Blog & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
}
