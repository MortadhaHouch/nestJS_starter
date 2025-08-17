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
exports.WorkspaceController = void 0;
const common_1 = require("@nestjs/common");
const workspace_service_1 = require("./workspace.service");
const create_workspace_dto_1 = require("./dto/create-workspace.dto");
const update_workspace_dto_1 = require("./dto/update-workspace.dto");
const mongoose_1 = require("@nestjs/mongoose");
const add_users_dto_1 = require("./dto/add-users.dto");
let WorkspaceController = class WorkspaceController {
    workspaceService;
    constructor(workspaceService) {
        this.workspaceService = workspaceService;
    }
    create(req, createWorkspaceDto) {
        return this.workspaceService.create(createWorkspaceDto, req.user._id);
    }
    findAll(req) {
        return this.workspaceService.findAll(req.user._id);
    }
    async findOne(req, id) {
        return await this.workspaceService.findAccessible(id, req.user._id);
    }
    async update(id, updateWorkspaceDto, req) {
        const foundWorkspace = await this.workspaceService.findMyWorkspace(id, req.user._id);
        if (!foundWorkspace)
            return new common_1.NotFoundException({
                error: "workspace not found"
            });
        return this.workspaceService.update(id, updateWorkspaceDto);
    }
    async joinWorkspace(id, req, userIds) {
        const foundWorkspace = await this.workspaceService.findMyWorkspace(id, req.user._id);
        if (!foundWorkspace)
            return new common_1.NotFoundException({
                error: "workspace not found"
            });
        return this.workspaceService.addUsers(id, userIds.ids);
    }
    async remove(id, req) {
        const foundWorkspace = await this.workspaceService.findMyWorkspace(id, req.user._id);
        if (foundWorkspace) {
            return this.workspaceService.remove(id);
        }
        return new common_1.UnauthorizedException({ error: "unauthorized" });
    }
};
exports.WorkspaceController = WorkspaceController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_workspace_dto_1.CreateWorkspaceDto]),
    __metadata("design:returntype", void 0)
], WorkspaceController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WorkspaceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', mongoose_1.IsObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], WorkspaceController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', mongoose_1.IsObjectIdPipe)),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_workspace_dto_1.UpdateWorkspaceDto, Object]),
    __metadata("design:returntype", Promise)
], WorkspaceController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)('join/:id'),
    __param(0, (0, common_1.Param)('id', mongoose_1.IsObjectIdPipe)),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, add_users_dto_1.AddUsersDto]),
    __metadata("design:returntype", Promise)
], WorkspaceController.prototype, "joinWorkspace", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', mongoose_1.IsObjectIdPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], WorkspaceController.prototype, "remove", null);
exports.WorkspaceController = WorkspaceController = __decorate([
    (0, common_1.Controller)('workspace'),
    __metadata("design:paramtypes", [workspace_service_1.WorkspaceService])
], WorkspaceController);
//# sourceMappingURL=workspace.controller.js.map