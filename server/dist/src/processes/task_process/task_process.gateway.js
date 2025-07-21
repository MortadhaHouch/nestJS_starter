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
exports.TaskProcessGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const task_process_service_1 = require("./task_process.service");
const create_task_dto_1 = require("../../task/dto/create-task.dto");
const update_task_dto_1 = require("../../task/dto/update-task.dto");
const socket_io_1 = require("socket.io");
let TaskProcessGateway = class TaskProcessGateway {
    taskProcessService;
    constructor(taskProcessService) {
        this.taskProcessService = taskProcessService;
    }
    handleConnection(client) {
        this.server.emit('room', client.id + ' joined!');
        console.log("client connected", client.id);
    }
    handleDisconnect(client) {
        this.server.emit('room', client.id + ' left!');
        console.log("client disconnected");
    }
    server;
    create(createTaskDto) {
        return this.taskProcessService.create(createTaskDto);
    }
    findAll() {
        return this.taskProcessService.findAll();
    }
    findOne(id) {
        return this.taskProcessService.findOne(id);
    }
    update(updateTaskDto) {
        return updateTaskDto;
    }
    remove(id) {
        return this.taskProcessService.remove(id);
    }
};
exports.TaskProcessGateway = TaskProcessGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], TaskProcessGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('add-task'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_task_dto_1.CreateTaskDto]),
    __metadata("design:returntype", void 0)
], TaskProcessGateway.prototype, "create", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('find-all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TaskProcessGateway.prototype, "findAll", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('find-one'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TaskProcessGateway.prototype, "findOne", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('update-task'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_task_dto_1.UpdateTaskDto]),
    __metadata("design:returntype", void 0)
], TaskProcessGateway.prototype, "update", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('remove-task'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TaskProcessGateway.prototype, "remove", null);
exports.TaskProcessGateway = TaskProcessGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(3001),
    __metadata("design:paramtypes", [task_process_service_1.TaskProcessService])
], TaskProcessGateway);
//# sourceMappingURL=task_process.gateway.js.map