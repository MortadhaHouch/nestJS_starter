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
exports.TeamProcesses = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const types_1 = require("../../../utils/types");
let TeamProcesses = class TeamProcesses extends bullmq_1.WorkerHost {
    mailService;
    constructor(mailService) {
        super();
        this.mailService = mailService;
    }
    async process(job) {
        switch (job.name) {
            case "add-member":
                await this.mailService.sendMail({
                    to: job.data.email,
                    subject: "You have been added to a team",
                    text: "You have been added to a team",
                    template: 'team-add-member',
                    context: {
                        firstName: job.data.firstName,
                        lastName: job.data.lastName,
                        teamName: job.data.teamName,
                        year: new Date().getFullYear()
                    }
                });
                break;
            case "remove-member":
                await this.mailService.sendMail({
                    to: job.data.email,
                    subject: "You have been removed from a team",
                    text: "You have been removed from a team",
                    template: 'team-remove-member',
                    context: {
                        firstName: job.data.firstName,
                        lastName: job.data.lastName,
                        teamName: job.data.teamName,
                        year: new Date().getFullYear()
                    }
                });
                break;
        }
    }
};
exports.TeamProcesses = TeamProcesses;
exports.TeamProcesses = TeamProcesses = __decorate([
    (0, bullmq_1.Processor)(types_1.ProcessName.TEAM),
    __param(0, (0, common_1.Inject)()),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], TeamProcesses);
//# sourceMappingURL=team_processes.js.map