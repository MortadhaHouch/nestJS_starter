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
exports.NotificationProcessesGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const notification_processes_service_1 = require("./notification_processes.service");
const create_notification_process_dto_1 = require("./dto/create-notification_process.dto");
const update_notification_process_dto_1 = require("./dto/update-notification_process.dto");
let NotificationProcessesGateway = class NotificationProcessesGateway {
    notificationProcessesService;
    constructor(notificationProcessesService) {
        this.notificationProcessesService = notificationProcessesService;
    }
    create(createNotificationProcessDto) {
        return this.notificationProcessesService.create(createNotificationProcessDto);
    }
    findAll() {
        return this.notificationProcessesService.findAll();
    }
    findOne(id) {
        return this.notificationProcessesService.findOne(id);
    }
    update(updateNotificationProcessDto) {
        return this.notificationProcessesService.update(updateNotificationProcessDto.id, updateNotificationProcessDto);
    }
    remove(id) {
        return this.notificationProcessesService.remove(id);
    }
};
exports.NotificationProcessesGateway = NotificationProcessesGateway;
__decorate([
    (0, websockets_1.SubscribeMessage)('createNotificationProcess'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_notification_process_dto_1.CreateNotificationProcessDto]),
    __metadata("design:returntype", void 0)
], NotificationProcessesGateway.prototype, "create", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('findAllNotificationProcesses'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NotificationProcessesGateway.prototype, "findAll", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('findOneNotificationProcess'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], NotificationProcessesGateway.prototype, "findOne", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('updateNotificationProcess'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_notification_process_dto_1.UpdateNotificationProcessDto]),
    __metadata("design:returntype", void 0)
], NotificationProcessesGateway.prototype, "update", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('removeNotificationProcess'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], NotificationProcessesGateway.prototype, "remove", null);
exports.NotificationProcessesGateway = NotificationProcessesGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(),
    __metadata("design:paramtypes", [notification_processes_service_1.NotificationProcessesService])
], NotificationProcessesGateway);
//# sourceMappingURL=notification_processes.gateway.js.map