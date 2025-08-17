/* eslint-disable prettier/prettier */
import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
import { MailerService } from '@nestjs-modules/mailer';
import { Inject } from '@nestjs/common';
import { ProcessName } from 'utils/types';
@Processor(ProcessName.TEAM)
export class TeamProcesses extends WorkerHost{
    constructor(@Inject() private readonly mailService: MailerService) {
        super();
    }
    async process(job: Job<any>): Promise<any> {
        switch (job.name) {
            case "add-member":
                await this.mailService.sendMail({
                    to:job.data.email,
                    subject:"You have been added to a team",
                    text:"You have been added to a team",
                    template:'team-add-member',
                    context:{
                        firstName:job.data.firstName,
                        lastName:job.data.lastName,
                        teamName:job.data.teamName,
                        year:new Date().getFullYear()
                    }
                })
                break;
            case "remove-member":
                await this.mailService.sendMail({
                    to:job.data.email,
                    subject:"You have been removed from a team",
                    text:"You have been removed from a team",
                    template:'team-remove-member',
                    context:{
                        firstName:job.data.firstName,
                        lastName:job.data.lastName,
                        teamName:job.data.teamName,
                        year:new Date().getFullYear()
                    }
                })
                break;
        }
    }
    
}
