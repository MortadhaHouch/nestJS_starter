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
exports.TeamService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let TeamService = class TeamService {
    teamModel;
    teamFields = {
        name: 1,
        description: 1,
        status: 1,
        creator: 1,
        members: 1,
        createdAt: 1,
        updatedAt: 1,
        workspaces: 1,
        discussions: 1
    };
    constructor(teamModel) {
        this.teamModel = teamModel;
    }
    async addOrRemoveUser(id, creator) {
        const foundTeam = await this.teamModel.findOne({
            _id: id,
            members: {
                $in: [creator]
            }
        });
        if (foundTeam) {
            const updateResult = await this.teamModel.updateOne({
                _id: id,
                members: {
                    $in: [creator]
                }
            }, {
                $pull: {
                    members: creator
                }
            });
            return {
                team: updateResult,
                isAdded: false
            };
        }
        const updateResult = await this.teamModel.updateOne({
            _id: id,
            members: {
                $in: [creator]
            }
        }, {
            $addToSet: {
                members: creator
            }
        });
        return {
            team: updateResult,
            isAdded: true
        };
    }
    async create(createTeamDto, creator) {
        const createdTeam = await this.teamModel.create({ ...createTeamDto, creator });
        return createdTeam;
    }
    async findAll(creator, page, search) {
        if (page) {
            const teams = await this.teamModel
                .find({ creator, name: { $regex: search ?? "", $options: "i" } })
                .populate("creator", "firstName lastName email _id")
                .populate("members", "firstName lastName email _id")
                .skip(page ? (page - 1) * 10 : 0)
                .limit(10);
            return {
                teams,
                count: teams.length,
                page: isNaN(Number(page)) ? 1 : Number(page)
            };
        }
        const teams = await this.teamModel
            .find({ creator, name: { $regex: search ?? "", $options: "i" } })
            .populate("creator", "firstName lastName email _id")
            .populate("members", "firstName lastName email _id");
        return teams;
    }
    async findOne(id, creator) {
        const foundTeam = await this.teamModel.findOne({
            _id: id,
            creator
        })
            .populate("creator", "firstName lastName email _id")
            .populate("members", "firstName lastName email _id");
        if (foundTeam) {
            return {
                team: foundTeam,
                isAdmin: true
            };
        }
        const foundMember = await this.teamModel.findOne({
            _id: id,
            members: creator
        })
            .populate("creator", "firstName lastName email _id")
            .populate("members", "firstName lastName email _id");
        if (foundMember) {
            return {
                team: foundMember,
                isAdmin: false
            };
        }
        return null;
    }
    async update(id, creator, updateTeamDto) {
        const updatedTeam = await this.teamModel.findOneAndUpdate({
            _id: id,
            creator
        }, updateTeamDto, { new: true });
        return updatedTeam;
    }
    async remove(id, creator) {
        const deletedTeam = await this.teamModel.findOneAndDelete({
            _id: id,
            creator
        });
        return deletedTeam;
    }
};
exports.TeamService = TeamService;
exports.TeamService = TeamService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("Team")),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TeamService);
//# sourceMappingURL=team.service.js.map