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
exports.TaskController = void 0;
const common_1 = require("@nestjs/common");
const task_service_1 = require("./task.service");
const create_task_dto_1 = require("./dto/create-task.dto");
const update_task_dto_1 = require("./dto/update-task.dto");
const mongoose_1 = require("@nestjs/mongoose");
const cache_manager_1 = require("@nestjs/cache-manager");
let TaskController = class TaskController {
    taskService;
    cacheManager;
    constructor(taskService, cacheManager) {
        this.taskService = taskService;
        this.cacheManager = cacheManager;
    }
    create(createTaskDto, req) {
        const taskData = {
            ...createTaskDto,
            userId: req.user._id
        };
        return this.taskService.create(taskData);
    }
    async findAll(req, page, limit, status, sortBy, sortOrder, search) {
        const options = {
            page: page ? parseInt(page) : 1,
            limit: limit ? parseInt(limit) : 10,
            status: status,
            userId: req.user._id,
            sortBy,
            sortOrder,
            search
        };
        const cacheKey = `${req.user.firstName}_${req.user.lastName}_all_tasks`;
        const cachedTasks = await this.cacheManager.get(cacheKey);
        if (cachedTasks) {
            console.log("cache hit");
            return cachedTasks;
        }
        console.log("cache miss");
        const tasks = await this.taskService.findAll(options);
        await this.cacheManager.set(cacheKey, tasks);
        return tasks;
    }
    findOverdue(req) {
        return this.taskService.findOverdueTasks(req.user._id);
    }
    async getStats(req) {
        const cacheKey = `${req.user.firstName}_${req.user.lastName}_stats`;
        const cachedTasks = await this.cacheManager.get(cacheKey);
        if (cachedTasks) {
            return cachedTasks;
        }
        const tasks = await this.taskService.getTaskStats(req.user._id);
        await this.cacheManager.set(cacheKey, tasks);
        return tasks;
    }
    async findOne(req, id) {
        const cacheKey = `${req.user.firstName}_${req.user.lastName}_${id}`;
        const foundTask = await this.cacheManager.get(cacheKey);
        if (foundTask) {
            return foundTask;
        }
        const task = await this.taskService.findOne(req.user._id, id);
        await this.cacheManager.set(cacheKey, task);
        return task;
    }
    async update(req, id, updateTaskDto) {
        const updatedTask = await this.taskService.update(id, updateTaskDto);
        const cacheKey = `${req.user.firstName}_${req.user.lastName}_${id}`;
        const cachedTask = await this.cacheManager.get(cacheKey);
        if (cachedTask) {
            await this.cacheManager.set(cacheKey, updatedTask);
        }
        return updatedTask;
    }
    async remove(req, id) {
        const promises = await Promise.allSettled([
            await this.taskService.remove(req.user._id, id),
            await this.cacheManager.del(`${req.user.firstName}_${req.user.lastName}_${id}`)
        ]);
        if (promises.every((p) => p.status == "fulfilled")) {
            return {
                message: "task successfully deleted",
                success: true
            };
        }
        return {
            error: "error deleting the task",
            success: false
        };
    }
};
exports.TaskController = TaskController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_task_dto_1.CreateTaskDto, Object]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)("page")),
    __param(2, (0, common_1.Query)("limit")),
    __param(3, (0, common_1.Query)("status")),
    __param(4, (0, common_1.Query)("sortBy")),
    __param(5, (0, common_1.Query)("sortOrder")),
    __param(6, (0, common_1.Query)("search")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('overdue'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "findOverdue", null);
__decorate([
    (0, common_1.Get)('stats'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', mongoose_1.IsObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', mongoose_1.IsObjectIdPipe)),
    __param(2, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, update_task_dto_1.UpdateTaskDto]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', mongoose_1.IsObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "remove", null);
exports.TaskController = TaskController = __decorate([
    (0, common_1.Controller)('task'),
    __param(1, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [task_service_1.TaskService, Object])
], TaskController);
//# sourceMappingURL=task.controller.js.map