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
exports.NotificationService = void 0;
const user_service_1 = require("../user/user.service");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let NotificationService = class NotificationService {
    notificationModel;
    userService;
    constructor(notificationModel, userService) {
        this.notificationModel = notificationModel;
        this.userService = userService;
    }
    create(createNotificationDto) {
        return this.notificationModel.create(createNotificationDto);
    }
    findAll(id, p) {
        return this.userService.findById(id).populate("notifications").skip(p ? p * 10 : 0).limit(10);
    }
    findByStatus(id, status, p) {
        const query = {
            creator: id
        };
        if (status) {
            query["type"] = status;
        }
        if (status) {
            return this.notificationModel.find(query).skip(p ? p * 10 : 0).limit(10);
        }
        return this.notificationModel.find(query).skip(p ? p * 10 : 0).limit(10);
    }
    findOne(id) {
        return this.notificationModel.findById(id);
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("Notification")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_service_1.UserService])
], NotificationService);
//# sourceMappingURL=notification.service.js.map