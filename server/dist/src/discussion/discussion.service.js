"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscussionService = void 0;
const common_1 = require("@nestjs/common");
let DiscussionService = class DiscussionService {
    create(createDiscussionDto) {
        return 'This action adds a new discussion';
    }
    findAll() {
        return `This action returns all discussion`;
    }
    findOne(id) {
        return `This action returns a #${id} discussion`;
    }
    update(id, updateDiscussionDto) {
        return `This action updates a #${id} discussion`;
    }
    remove(id) {
        return `This action removes a #${id} discussion`;
    }
};
exports.DiscussionService = DiscussionService;
exports.DiscussionService = DiscussionService = __decorate([
    (0, common_1.Injectable)()
], DiscussionService);
//# sourceMappingURL=discussion.service.js.map