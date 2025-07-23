"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthProcessesModule = void 0;
const common_1 = require("@nestjs/common");
const auth_processes_1 = require("./auth_processes");
const bullmq_1 = require("@nestjs/bullmq");
const types_1 = require("../../../utils/types");
let AuthProcessesModule = class AuthProcessesModule {
};
exports.AuthProcessesModule = AuthProcessesModule;
exports.AuthProcessesModule = AuthProcessesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            bullmq_1.BullModule.registerQueue({
                name: types_1.ProcessName.GMAIL,
            }),
        ],
        providers: [auth_processes_1.NotificationProcesses],
    })
], AuthProcessesModule);
//# sourceMappingURL=auth_processes.module.js.map