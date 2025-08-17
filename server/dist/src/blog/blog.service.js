"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let BlogService = class BlogService {
    blogModel;
    blogFields = {
        title: 1,
        description: 1,
        status: 1,
        creator: 1,
        createdAt: 1,
        updatedAt: 1,
        content: 1,
        tags: 1,
        likers: 1,
        dislikers: 1,
        comments: 1,
        views: 1,
        bookmarks: 1
    };
    constructor(blogModel) {
        this.blogModel = blogModel;
    }
    create(creator, createBlogDto) {
        return this.blogModel.create({ ...createBlogDto, creator: creator });
    }
    async findMyBlogs(id) {
        return this.blogModel.find({
            creator: id
        })
            .select(this.blogFields)
            .populate("creator", "firstName lastName email");
    }
    async findAll(p, tags) {
        const query = {};
        let foundBlogs;
        if (tags) {
            query["tags"] = { $all: tags.split(",") };
        }
        if (p) {
            foundBlogs = await this.blogModel.find(query).skip(p * 10).limit(10).populate("creator", "firstName lastName email");
        }
        else {
            foundBlogs = await this.blogModel.find(query).populate("creator", "firstName lastName email");
        }
        return {
            results: foundBlogs,
            count: foundBlogs.length,
            p
        };
    }
    async getStats(createdAt, dateRange) {
        if (createdAt) {
            const blogsGroupedByDate = await this.blogModel.aggregate([
                { $match: { createdAt: { $gte: createdAt } } },
                { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, count: { $sum: 1 } } },
            ]);
            return {
                results: blogsGroupedByDate,
                count: blogsGroupedByDate.length
            };
        }
        if (dateRange) {
            const blogsGroupedByDate = await this.blogModel.aggregate([
                { $match: { createdAt: { $gte: dateRange.from, $lte: dateRange.to } } },
                { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, count: { $sum: 1 } } },
            ]);
            return {
                results: blogsGroupedByDate,
                count: blogsGroupedByDate.length
            };
        }
    }
    async findOne(id, tags, p) {
        const results = {};
        const foundBlog = await this.blogModel.findById(id).populate("creator", "firstName lastName email _id");
        results["blog"] = foundBlog;
        if (tags) {
            const similarBlogs = await this.blogModel.find({
                _id: { $ne: id },
                tags: { $all: tags.split(",") }
            }).populate("creator", "firstName lastName email _id").skip(p ? p * 10 : 0).limit(10);
            results["similarBlogs"] = similarBlogs;
            results["count"] = similarBlogs.length;
            results["page"] = p ? p : 0;
        }
        else {
            results["similarBlogs"] = [];
            results["count"] = 0;
            results["page"] = 0;
        }
        return results;
    }
    async update(id, updateBlogDto) {
        const foundBlog = await this.blogModel.findById(id);
        if (foundBlog) {
            return this.blogModel.findByIdAndUpdate(id, updateBlogDto, {
                runValidators: true,
                new: true
            });
        }
        return new common_1.NotFoundException({ notFound: "blog not found" });
    }
    async remove(id) {
        return this.blogModel.findByIdAndDelete(id);
    }
};
exports.BlogService = BlogService;
exports.BlogService = BlogService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('Blog')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], BlogService);
//# sourceMappingURL=blog.service.js.map