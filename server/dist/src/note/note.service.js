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
exports.NoteService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let NoteService = class NoteService {
    noteModel;
    constructor(noteModel) {
        this.noteModel = noteModel;
    }
    create(createNoteDto, userId) {
        return this.noteModel.create({ ...createNoteDto, creator: userId });
    }
    async findAll(userId, page) {
        if (page) {
            const [notes, count] = await Promise.all([
                this.noteModel.find({ creator: userId }).populate("creator", "firstName lastName email _id").skip((page - 1) * 10).limit(10),
                this.noteModel.countDocuments({ creator: userId })
            ]);
            return {
                notes,
                count,
                page: Number(page)
            };
        }
        return this.noteModel.find({ creator: userId }).populate("creator", "firstName lastName email _id");
    }
    findOne(id, userId) {
        return this.noteModel.findOne({ creator: userId, _id: id }).populate("creator", "firstName lastName email _id");
    }
    update(id, updateNoteDto, userId) {
        return this.noteModel.findOneAndUpdate({ creator: userId, _id: id }, updateNoteDto).populate("creator", "firstName lastName email _id");
    }
    remove(id, userId) {
        return this.noteModel.findOneAndDelete({ creator: userId, _id: id }).populate("creator", "firstName lastName email _id");
    }
};
exports.NoteService = NoteService;
exports.NoteService = NoteService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('Note')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], NoteService);
//# sourceMappingURL=note.service.js.map