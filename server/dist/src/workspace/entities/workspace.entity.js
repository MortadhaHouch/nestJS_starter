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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceSchema = exports.Workspace = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const types_1 = require("../../../utils/types");
let Workspace = class Workspace {
    title;
    description;
    creator;
    members;
    tasks;
    status;
};
exports.Workspace = Workspace;
__decorate([
    (0, mongoose_2.Prop)({ required: true, type: String }),
    __metadata("design:type", String)
], Workspace.prototype, "title", void 0);
__decorate([
    (0, mongoose_2.Prop)({ required: true, type: String }),
    __metadata("design:type", String)
], Workspace.prototype, "description", void 0);
__decorate([
    (0, mongoose_2.Prop)({ required: true, type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_1.Schema.Types.ObjectId)
], Workspace.prototype, "creator", void 0);
__decorate([
    (0, mongoose_2.Prop)({ required: false, type: [mongoose_1.Schema.Types.ObjectId], ref: 'User', default: [] }),
    __metadata("design:type", Array)
], Workspace.prototype, "members", void 0);
__decorate([
    (0, mongoose_2.Prop)({ required: false, type: [mongoose_1.Schema.Types.ObjectId], ref: 'Task', default: [] }),
    __metadata("design:type", Array)
], Workspace.prototype, "tasks", void 0);
__decorate([
    (0, mongoose_2.Prop)({ required: false, default: "ACTIVE", enum: Object.keys(types_1.WorkSpaceStatus).map(k => k.toString()), type: String }),
    __metadata("design:type", String)
], Workspace.prototype, "status", void 0);
exports.Workspace = Workspace = __decorate([
    (0, mongoose_2.Schema)({ timestamps: true })
], Workspace);
exports.WorkspaceSchema = mongoose_2.SchemaFactory.createForClass(Workspace);
//# sourceMappingURL=workspace.entity.js.map