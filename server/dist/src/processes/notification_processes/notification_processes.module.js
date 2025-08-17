"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationProcessesModule = void 0;
const common_1 = require("@nestjs/common");
const notification_processes_service_1 = require("./notification_processes.service");
const notification_processes_gateway_1 = require("./notification_processes.gateway");
let NotificationProcessesModule = class NotificationProcessesModule {
};
exports.NotificationProcessesModule = NotificationProcessesModule;
exports.NotificationProcessesModule = NotificationProcessesModule = __decorate([
    (0, common_1.Module)({
        providers: [notification_processes_gateway_1.NotificationProcessesGateway, notification_processes_service_1.NotificationProcessesService],
    })
], NotificationProcessesModule);
//# sourceMappingURL=notification_processes.module.js.map