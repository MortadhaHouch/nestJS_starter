import { MailerService } from '@nestjs-modules/mailer';
import { WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
export declare class NotificationProcesses extends WorkerHost {
    private readonly mailService;
    constructor(mailService: MailerService);
    process(job: Job<any>): Promise<any>;
}
