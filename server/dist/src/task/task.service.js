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
    taskFields = {
        title: 1,
        description: 1,
        status: 1,
        priority: 1,
        dueDate: 1,
        creator: 1,
        createdAt: 1,
        updatedAt: 1,
    };
    constructor(taskModel) {
        this.taskModel = taskModel;
    }
    create(createTaskDto) {
        return this.taskModel.create(createTaskDto);
    }
    async findAll(id, page) {
        if (page) {
            const [tasks, count] = await Promise.all([
                this.taskModel.find({ creator: id }).populate("creator", "firstName lastName email _id").populate("assignees", "firstName lastName email _id").select(this.taskFields).skip(page ? (page - 1) * 10 : 0).limit(10),
                this.taskModel.countDocuments({ creator: id })
            ]);
            return {
                tasks,
                count,
                page: isNaN(Number(page)) ? 1 : Number(page)
            };
        }
        return this.taskModel.find({ creator: id }).populate("creator", "firstName lastName email _id").populate("assignees", "firstName lastName email _id").select(this.taskFields);
    }
    async getUserTasks(creator, ids) {
        const taskSearchP = ids.map((id) => this.taskModel.findOne({
            _id: id,
            creator
        }));
        const tasks = await Promise.all(taskSearchP);
        return tasks.flat();
    }
    async getTasksByDateRange(creator, createdAt, dateRange) {
        if (createdAt) {
            const tasks = await this.taskModel.aggregate([
                { $match: { createdAt: { $gte: createdAt }, creator } },
                { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, count: { $sum: 1 } } },
            ]);
            return tasks;
        }
        if (dateRange) {
            const dateQuery = {};
            if (dateRange.from) {
                dateQuery.$gte = dateRange.from;
            }
            if (dateRange.to) {
                dateQuery.$lte = dateRange.to;
            }
            const tasks = await this.taskModel.aggregate([
                { $match: { createdAt: dateQuery, creator } },
                { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, count: { $sum: 1 } } },
            ]);
            return tasks;
        }
    }
    async findOverdueTasks(creator) {
        const query = {
            overdue: { $lt: new Date() },
            status: { $ne: types_1.TaskStatus.DONE },
            creator
        };
        return this.taskModel.find(query).populate('creator', 'firstName lastName email').populate("assignees", "firstName lastName email _id").select(this.taskFields);
    }
    async getTaskStats(creator) {
        const stats = await this.taskModel.aggregate([
            { $match: { creator } },
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);
        const total = await this.taskModel.countDocuments({ creator });
        const overdue = await this.taskModel.countDocuments({
            creator,
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
    findOne(creator, id) {
        return this.taskModel.findOne({
            _id: id,
            creator
        });
    }
    update(id, updateTaskDto) {
        return this.taskModel.findByIdAndUpdate(id, updateTaskDto, { new: true });
    }
    async remove(creator, id) {
        const deletedTask = await this.taskModel.deleteOne({
            _id: id,
            creator
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