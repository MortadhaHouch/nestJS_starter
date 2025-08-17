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
const mongoose_1 = require("@nestjs/mongoose");
const workspace_entity_1 = require("./entities/workspace.entity");
const mongoose_2 = require("mongoose");
let WorkspaceService = class WorkspaceService {
    workspaceModel;
    workspaceFields = {
        name: 1,
        description: 1,
        status: 1,
        creator: 1,
        members: 1,
        createdAt: 1,
        updatedAt: 1,
    };
    constructor(workspaceModel) {
        this.workspaceModel = workspaceModel;
    }
    create(createWorkspaceDto, id) {
        return this.workspaceModel.create({ ...createWorkspaceDto, creator: id });
    }
    findAll(id) {
        return this.workspaceModel.find({
            $or: [
                { creator: id },
                { members: {
                        $in: [id]
                    } },
            ]
        }).select(this.workspaceFields).populate("creator", "firstName lastName email _id").populate("members", "firstName lastName email _id");
    }
    findOne(id) {
        return this.workspaceModel.findById(id);
    }
    update(id, updateWorkspaceDto) {
        return this.workspaceModel.updateOne({ _id: id }, { $set: updateWorkspaceDto });
    }
    findAccessible(id, creator) {
        return this.workspaceModel.findOne({
            _id: id,
            $or: [
                { creator: creator },
                { members: {
                        $in: [creator]
                    } },
            ]
        });
    }
    findMyWorkspace(id, creatorId) {
        return this.workspaceModel.findOne({
            _id: id,
            creator: creatorId
        });
    }
    remove(id) {
        return this.workspaceModel.deleteOne({ _id: id });
    }
    addUsers(id, userIds) {
        return this.workspaceModel.updateOne({ _id: id }, { members: { $addToSet: userIds } });
    }
};
exports.WorkspaceService = WorkspaceService;
exports.WorkspaceService = WorkspaceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(workspace_entity_1.Workspace.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], WorkspaceService);
//# sourceMappingURL=workspace.service.js.map