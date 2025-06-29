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
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const task_entity_1 = require("./entities/task.entity");
const types_1 = require("../../utils/types");
let TaskService = class TaskService {
    taskModel;
    constructor(taskModel) {
        this.taskModel = taskModel;
    }
    create(createTaskDto) {
        return this.taskModel.create(createTaskDto);
    }
    async findAll(options = {}) {
        try {
            const { page = 1, limit = 10, status, userId, sortBy = 'createdAt', sortOrder = 'desc', search } = options;
            if (page < 1 || limit < 1 || limit > 100) {
                throw new common_1.BadRequestException('Invalid pagination parameters');
            }
            const query = {};
            query.userId = userId;
            if (status) {
                query.status = status;
            }
            if (search) {
                query.$or = [
                    { title: { $regex: search, $options: 'i' } },
                    { description: { $regex: search, $options: 'i' } }
                ];
            }
            const sort = {};
            sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
            const skip = (page - 1) * limit;
            const [tasks, total] = await Promise.all([
                this.taskModel
                    .find(query)
                    .sort(sort)
                    .skip(skip)
                    .limit(limit)
                    .populate('userId', 'firstName lastName email')
                    .exec(),
                this.taskModel.countDocuments(query)
            ]);
            return {
                tasks,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit),
                    hasNext: page < Math.ceil(total / limit),
                    hasPrev: page > 1
                }
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(`Failed to fetch tasks: ${error.message}`);
        }
    }
    async getUserTasks(userId, ids) {
        const taskSearchP = ids.map((id) => this.taskModel.findOne({
            _id: id,
            userId
        }));
        const tasks = await Promise.all(taskSearchP);
        return tasks.flat();
    }
    async findOverdueTasks(userId) {
        const query = {
            overdue: { $lt: new Date() },
            status: { $ne: types_1.TaskStatus.DONE },
            userId
        };
        return this.taskModel.find(query).populate('userId', 'firstName lastName email');
    }
    async getTaskStats(userId) {
        const stats = await this.taskModel.aggregate([
            { $match: { userId } },
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);
        const total = await this.taskModel.countDocuments({ userId });
        const overdue = await this.taskModel.countDocuments({
            userId,
            overdue: { $lt: new Date() },
            status: { $ne: types_1.TaskStatus.DONE }
        });
        return {
            total,
            overdue,
            byStatus: stats.reduce((acc, stat) => {
                acc[stat._id] = stat.count;
                return acc;
            }, {})
        };
    }
    findOne(userId, id) {
        return this.taskModel.findOne({
            _id: id,
            userId
        });
    }
    update(id, updateTaskDto) {
        return this.taskModel.findByIdAndUpdate(id, updateTaskDto, { new: true });
    }
    async remove(userId, id) {
        const deletedTask = await this.taskModel.findOneAndDelete({
            _id: id,
            userId
        });
        if (deletedTask) {
            return {
                deleted: true,
                id
            };
        }
        throw new common_1.NotFoundException('Task not found');
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(task_entity_1.Task.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TaskService);
//# sourceMappingURL=task.service.js.map