/* eslint-disable prettier/prettier */
import { MailerService } from '@nestjs-modules/mailer';
import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Inject } from '@nestjs/common';
import { Job } from "bullmq";
import { ProcessName } from 'utils/types';

@Processor(ProcessName.GMAIL)
export class NotificationProcesses extends WorkerHost {
    constructor(@Inject() private readonly mailService: MailerService) {
        super();
    }
    async process(job: Job<any>): Promise<any> {
        // Example: Log the job data
        switch (job.name) {
            case "login":
                await this.mailService.sendMail({
                    to:job.data.email,
                    subject:"Login successful",
                    text:"Login successful",
                    template:'access-code',
                    context:{
                        verificationCode:job.data.validationCode,
                        content:`Welcome back ${job.data.firstName} ${job.data.lastName} , thanks for joining us`,
                        year:new Date().getFullYear()
                    }
                })
                break;
            case "access-failure":
                await this.mailService.sendMail({
                    to:job.data.email,
                    subject:"Login failed",
                    text:"Login failed",
                    template:'access-failure',
                    context:{
                        verificationCode:job.data.validationCode,
                        content:`Dear ${job.data.firstName} ${job.data.lastName} , your login attempt has failed ,please try again or mark this action as spam`,
                        year:new Date().getFullYear()
                    }
                })
                break;
        }
    }
}
