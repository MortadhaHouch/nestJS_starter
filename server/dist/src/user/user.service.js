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
exports.UserService = void 0;
const blog_service_1 = require("./../blog/blog.service");
const team_service_1 = require("./../team/team.service");
const task_service_1 = require("./../task/task.service");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const bcrypt = require("bcrypt");
const workspace_service_1 = require("../workspace/workspace.service");
const comment_service_1 = require("../comment/comment.service");
const mongoose_2 = require("@nestjs/mongoose");
let UserService = class UserService {
    userModel;
    taskService;
    workspaceService;
    teamService;
    blogService;
    commentService;
    async getFriends(_id) {
        return this.userModel.findById(_id).select(this.userFields).populate("friends", "firstName lastName email _id phoneNumber birthDate ").select({ ...this.userFields, friends: 1 });
    }
    userFields = {
        firstName: 1,
        lastName: 1,
        email: 1,
        _id: 1,
        accessLevel: 1,
        friends: 1,
        views: 1,
        latestLoginTrial: 1,
        createdAt: 1,
        updatedAt: 1,
        socialMediaLinks: 1,
        website: 1,
        birthDate: 1,
        phoneNumber: 1,
        isLoggedIn: 1
    };
    constructor(userModel, taskService, workspaceService, teamService, blogService, commentService) {
        this.userModel = userModel;
        this.taskService = taskService;
        this.workspaceService = workspaceService;
        this.teamService = teamService;
        this.blogService = blogService;
        this.commentService = commentService;
    }
    async getMyProfile(id) {
        return this.userModel.findById(id).select(this.userFields);
    }
    async getUserProfile(id) {
        const userSearchTask = this.userModel.findById(id).select(this.userFields).populate("friends", "firstName lastName email _id").populate("views", "firstName lastName email _id");
        const tasksSearchTask = this.taskService.findAll(id);
        const workspacesSearchTask = this.workspaceService.findAll(id);
        const teamsSearchTask = this.teamService.findAll(id);
        const blogsSearchTask = this.blogService.findMyBlogs(id);
        const commentsSearchTask = this.commentService.findMyComments(id);
        const [user, tasks, workspaces, teams, blogs, comments] = await Promise.all([
            userSearchTask,
            tasksSearchTask,
            workspacesSearchTask,
            teamsSearchTask,
            blogsSearchTask,
            commentsSearchTask
        ]);
        return {
            user,
            tasks,
            workspaces,
            teams,
            blogs,
            comments
        };
    }
    create(user) {
        return this.userModel.create(user);
    }
    findUserByEmail(email) {
        return this.userModel.findOne({ email });
    }
    findById(id) {
        return this.userModel.findById(id);
    }
    async hashPassword(password, salt) {
        return await bcrypt.hash(password, salt || 10);
    }
    async checkPassword(password, hash) {
        return await bcrypt.compare(password, hash);
    }
    async findUserByName({ firstName, lastName }) {
        return await this.userModel.findOne({ firstName, lastName });
    }
    async findUserByNameOrEmail(id, { email, firstName, lastName }) {
        return await this.userModel.find({
            $and: [
                {
                    $or: [
                        { firstName: { $regex: firstName, $options: "i" } },
                        { lastName: { $regex: lastName, $options: "i" } },
                        { email: { $regex: email, $options: "i" } }
                    ]
                },
                { _id: { $ne: id } }
            ]
        }).select(this.userFields);
    }
    async findAllUsers() {
        return await this.userModel.find();
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)("User")),
    __metadata("design:paramtypes", [mongoose_1.Model,
        task_service_1.TaskService,
        workspace_service_1.WorkspaceService,
        team_service_1.TeamService,
        blog_service_1.BlogService,
        comment_service_1.CommentService])
], UserService);
//# sourceMappingURL=user.service.js.map