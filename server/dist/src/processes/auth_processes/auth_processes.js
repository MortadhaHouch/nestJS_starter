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
exports.NotificationProcesses = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const bullmq_1 = require("@nestjs/bullmq");
const common_1 = require("@nestjs/common");
let NotificationProcesses = class NotificationProcesses extends bullmq_1.WorkerHost {
    mailService;
    constructor(mailService) {
        super();
        this.mailService = mailService;
    }
    async process(job) {
        switch (job.name) {
            case "login":
                await this.mailService.sendMail({
                    to: job.data.email,
                    subject: "Login successful",
                    text: "Login successful",
                    template: 'access-code',
                    context: {
                        verificationCode: job.data.validationCode,
                        content: `Welcome back ${job.data.firstName} ${job.data.lastName} , thanks for joining us`,
                        year: new Date().getFullYear()
                    }
                });
                break;
            case "access-failure":
                await this.mailService.sendMail({
                    to: job.data.email,
                    subject: "Login failed",
                    text: "Login failed",
                    template: 'access-failure',
                    context: {
                        verificationCode: job.data.validationCode,
                        content: `Dear ${job.data.firstName} ${job.data.lastName} , your login attempt has failed ,please try again or mark this action as spam`,
                        year: new Date().getFullYear()
                    }
                });
                break;
        }
    }
};
exports.NotificationProcesses = NotificationProcesses;
exports.NotificationProcesses = NotificationProcesses = __decorate([
    (0, bullmq_1.Processor)("auth-processes"),
    __param(0, (0, common_1.Inject)()),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], NotificationProcesses);
//# sourceMappingURL=auth_processes.js.map