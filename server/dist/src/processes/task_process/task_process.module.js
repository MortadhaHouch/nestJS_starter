"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskProcessModule = void 0;
const common_1 = require("@nestjs/common");
const task_process_service_1 = require("./task_process.service");
const task_process_gateway_1 = require("./task_process.gateway");
let TaskProcessModule = class TaskProcessModule {
};
exports.TaskProcessModule = TaskProcessModule;
exports.TaskProcessModule = TaskProcessModule = __decorate([
    (0, common_1.Module)({
        providers: [task_process_gateway_1.TaskProcessGateway, task_process_service_1.TaskProcessService],
    })
], TaskProcessModule);
//# sourceMappingURL=task_process.module.js.map