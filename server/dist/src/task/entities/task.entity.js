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
exports.TaskSchema = exports.Task = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const types_1 = require("../../../utils/types");
const mongoose_2 = require("mongoose");
let Task = class Task {
    _id;
    title;
    description;
    status;
    overdue;
    userId;
    tags;
    priority;
    assignees;
    comments;
    attachments;
    checklist;
    color;
    notes;
};
exports.Task = Task;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Task.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Task.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: Object.keys(types_1.TaskStatus).map(k => k.toString()), default: types_1.TaskStatus.PENDING, type: String }),
    __metadata("design:type", String)
], Task.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: new Date(new Date().setDate(new Date().getDate() + 1)), required: false }),
    __metadata("design:type", Date)
], Task.prototype, "overdue", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: "User", required: true }),
    __metadata("design:type", mongoose_2.Schema.Types.ObjectId)
], Task.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ tags: [String], required: false }),
    __metadata("design:type", Array)
], Task.prototype, "tags", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: types_1.TaskPriority.MEDIUM, enum: Object.keys(types_1.TaskPriority).map(k => k.toString()), type: String, required: true }),
    __metadata("design:type", String)
], Task.prototype, "priority", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: [], type: [{ type: mongoose_2.Schema.Types.ObjectId, ref: "User" }] }),
    __metadata("design:type", Array)
], Task.prototype, "assignees", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [], required: false }),
    __metadata("design:type", Array)
], Task.prototype, "comments", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], required: false, default: [] }),
    __metadata("design:type", Array)
], Task.prototype, "attachments", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ name: String, checked: Boolean }], required: false, default: [] }),
    __metadata("design:type", Array)
], Task.prototype, "checklist", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: false }),
    __metadata("design:type", String)
], Task.prototype, "color", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: false }),
    __metadata("design:type", String)
], Task.prototype, "notes", void 0);
exports.Task = Task = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Task);
exports.TaskSchema = mongoose_1.SchemaFactory.createForClass(Task);
//# sourceMappingURL=task.entity.js.map