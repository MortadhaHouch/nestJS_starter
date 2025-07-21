"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskProcessService = void 0;
const common_1 = require("@nestjs/common");
let TaskProcessService = class TaskProcessService {
    create(createTaskDto) {
        return 'This action adds a new taskProcess';
    }
    findAll() {
        return `This action returns all taskProcess`;
    }
    findOne(id) {
        return `This action returns a #${id} taskProcess`;
    }
    update(id, updateTaskDto) {
        return updateTaskDto;
    }
    remove(id) {
        return `This action removes a #${id} taskProcess`;
    }
};
exports.TaskProcessService = TaskProcessService;
exports.TaskProcessService = TaskProcessService = __decorate([
    (0, common_1.Injectable)()
], TaskProcessService);
//# sourceMappingURL=task_process.service.js.map