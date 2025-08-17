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
exports.DiscussionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let DiscussionService = class DiscussionService {
    discussionModel;
    constructor(discussionModel) {
        this.discussionModel = discussionModel;
    }
    create(createDiscussionDto) {
        const createdDiscussion = new this.discussionModel(createDiscussionDto);
        return createdDiscussion.save();
    }
    findAll() {
        return this.discussionModel.find().exec();
    }
    findOne(id) {
        return this.discussionModel.findById(id).exec();
    }
    update(id, updateDiscussionDto) {
        return this.discussionModel.findByIdAndUpdate(id, updateDiscussionDto).exec();
    }
    remove(id) {
        return this.discussionModel.findByIdAndDelete(id).exec();
    }
};
exports.DiscussionService = DiscussionService;
exports.DiscussionService = DiscussionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('Discussion')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], DiscussionService);
//# sourceMappingURL=discussion.service.js.map