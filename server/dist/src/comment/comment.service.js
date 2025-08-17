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
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const blog_service_1 = require("../blog/blog.service");
let CommentService = class CommentService {
    commentModel;
    blogService;
    commentFields = {
        content: 1,
        creatorId: 1,
        blogId: 1,
        createdAt: 1,
        updatedAt: 1,
        __v: 1
    };
    constructor(commentModel, blogService) {
        this.commentModel = commentModel;
        this.blogService = blogService;
    }
    async create(blogId, creatorId, createCommentDto) {
        const blog = await this.blogService.findOne(blogId);
        if (!blog) {
            throw new Error("Blog not found");
        }
        return this.commentModel.create({ ...createCommentDto, blogId, creatorId });
    }
    async findAll(id) {
        return await this.commentModel.find({ blogId: id }).populate("creatorId", "firstName lastName email _id");
    }
    async findMyComments(creator) {
        return await this.commentModel.find({ creatorId: creator }).populate("creatorId", "firstName lastName email _id").select(this.commentFields);
    }
    async findOne(id) {
        return await this.commentModel.findById(id).populate("creatorId", "firstName lastName email _id");
    }
    update(id, updateCommentDto) {
        return this.commentModel.findByIdAndUpdate(id, updateCommentDto, {
            runValidators: true,
            new: true
        }).populate("creatorId", "firstName lastName email _id");
    }
    remove(id) {
        return this.commentModel.findByIdAndDelete(id).populate("creatorId", "firstName lastName email _id");
    }
};
exports.CommentService = CommentService;
exports.CommentService = CommentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)("Comment")),
    __metadata("design:paramtypes", [mongoose_1.Model,
        blog_service_1.BlogService])
], CommentService);
//# sourceMappingURL=comment.service.js.map