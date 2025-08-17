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
exports.TeamController = void 0;
const common_1 = require("@nestjs/common");
const team_service_1 = require("./team.service");
const create_team_dto_1 = require("./dto/create-team.dto");
const update_team_dto_1 = require("./dto/update-team.dto");
const mongoose_1 = require("@nestjs/mongoose");
const types_1 = require("../../utils/types");
const bullmq_1 = require("bullmq");
const bullmq_2 = require("@nestjs/bullmq");
const user_service_1 = require("../user/user.service");
let TeamController = class TeamController {
    teamService;
    userService;
    jobQueue;
    constructor(teamService, userService, jobQueue) {
        this.teamService = teamService;
        this.userService = userService;
        this.jobQueue = jobQueue;
    }
    create(createTeamDto, req) {
        return this.teamService.create(createTeamDto, req.user._id);
    }
    async findAll(req, page, search) {
        return await this.teamService.findAll(req.user._id, page, search);
    }
    async addOrRemoveUser(req, id, creator) {
        const [team, user] = await Promise.all([
            this.teamService.findOne(id, req.user._id),
            this.userService.findUserByEmail(req.user.email)
        ]);
        if (!team) {
            throw new Error("Team not found");
        }
        if (!user) {
            throw new Error("User not found");
        }
        if (team.isAdmin) {
            const result = await this.teamService.addOrRemoveUser(id, creator);
            if (result.isAdded) {
                await this.jobQueue.add("add-member", {
                    teamName: team.team.name,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                });
            }
            else {
                await this.jobQueue.add("remove-member", {
                    teamName: team.team.name,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                });
            }
            return result;
        }
        throw new Error("You are not authorized to add or remove users");
    }
    async findOne(id, req) {
        return this.teamService.findOne(id, req.user._id);
    }
    async update(id, req, updateTeamDto) {
        return this.teamService.update(id, req.user._id, updateTeamDto);
    }
    async remove(id, req) {
        return this.teamService.remove(id, req.user._id);
    }
};
exports.TeamController = TeamController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_team_dto_1.CreateTeamDto, Object]),
    __metadata("design:returntype", void 0)
], TeamController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)("page")),
    __param(2, (0, common_1.Query)("search")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, String]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)("toggle-add-user/:id/:creator"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("id", mongoose_1.IsObjectIdPipe)),
    __param(2, (0, common_1.Param)("creator", mongoose_1.IsObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "addOrRemoveUser", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', mongoose_1.IsObjectIdPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', mongoose_1.IsObjectIdPipe)),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, update_team_dto_1.UpdateTeamDto]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', mongoose_1.IsObjectIdPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "remove", null);
exports.TeamController = TeamController = __decorate([
    (0, common_1.Controller)('team'),
    __param(2, (0, bullmq_2.InjectQueue)(types_1.ProcessName.TEAM)),
    __metadata("design:paramtypes", [team_service_1.TeamService,
        user_service_1.UserService,
        bullmq_1.Queue])
], TeamController);
//# sourceMappingURL=team.controller.js.map