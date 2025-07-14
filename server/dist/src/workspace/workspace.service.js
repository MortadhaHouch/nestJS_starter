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
exports.WorkspaceService = void 0;
const common_1 = require("@nestjs/common");
const update_workspace_dto_1 = require("./dto/update-workspace.dto");
const mongoose_1 = require("@nestjs/mongoose");
const workspace_entity_1 = require("./entities/workspace.entity");
const mongoose_2 = require("mongoose");
const types_1 = require("../../utils/types");
let WorkspaceService = class WorkspaceService {
    workspaceModel;
    constructor(workspaceModel) {
        this.workspaceModel = workspaceModel;
    }
    create(createWorkspaceDto, id) {
        return this.workspaceModel.create({ ...createWorkspaceDto, creator: id });
    }
    findAll(id, p, limit, search, sortOrder, sortParams, status) {
        const searchConfig = {
            $or: [
                { title: { $regex: search || "", $options: 'i' } },
                { description: { $regex: search || "", $options: 'i' } },
                { status: status || types_1.WorkSpaceStatus.ACTIVE },
            ],
        };
        return this.workspaceModel.find({
            creator: id,
            ...searchConfig,
            ...sortParams ? { $sort: { [sortParams]: (sortOrder === 'asc') ? 1 : -1 } } : {},
        }).skip(p ? (p - 1) * (limit || 10) : 0).limit(limit || 10);
    }
    findOne(id) {
        return this.workspaceModel.findById(id);
    }
    update(id, updateWorkspaceDto) {
        return this.workspaceModel.findByIdAndUpdate(id, updateWorkspaceDto, {
            new: true,
            runValidators: true,
        });
    }
    remove(id) {
        return this.workspaceModel.findByIdAndDelete(id);
    }
};
exports.WorkspaceService = WorkspaceService;
__decorate([
    __param(0, (0, common_1.Param)('id', mongoose_1.IsObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WorkspaceService.prototype, "findOne", null);
__decorate([
    __param(0, (0, common_1.Param)('id', mongoose_1.IsObjectIdPipe)),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_workspace_dto_1.UpdateWorkspaceDto]),
    __metadata("design:returntype", void 0)
], WorkspaceService.prototype, "update", null);
__decorate([
    __param(0, (0, common_1.Param)('id', mongoose_1.IsObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WorkspaceService.prototype, "remove", null);
exports.WorkspaceService = WorkspaceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(workspace_entity_1.Workspace.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], WorkspaceService);
//# sourceMappingURL=workspace.service.js.map