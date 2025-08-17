import { WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
import { MailerService } from '@nestjs-modules/mailer';
export declare class TeamProcesses extends WorkerHost {
    private readonly mailService;
    constructor(mailService: MailerService);
    process(job: Job<any>): Promise<any>;
}
