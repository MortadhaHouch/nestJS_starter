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
exports.MessageService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let MessageService = class MessageService {
    messageModel;
    constructor(messageModel) {
        this.messageModel = messageModel;
    }
    create(createMessageDto) {
        const createdMessage = new this.messageModel(createMessageDto);
        return createdMessage.save();
    }
    findAll() {
        return this.messageModel.find().exec();
    }
    findOne(id) {
        return this.messageModel.findById(id).exec();
    }
    update(id, updateMessageDto) {
        return this.messageModel.findByIdAndUpdate(id, updateMessageDto).exec();
    }
    remove(id) {
        return this.messageModel.findByIdAndDelete(id).exec();
    }
};
exports.MessageService = MessageService;
exports.MessageService = MessageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('Message')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], MessageService);
//# sourceMappingURL=message.service.js.map