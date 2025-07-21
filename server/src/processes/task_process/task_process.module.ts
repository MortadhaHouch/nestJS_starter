/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TaskProcessService } from './task_process.service';
import { TaskProcessGateway } from './task_process.gateway';

@Module({
  providers: [TaskProcessGateway, TaskProcessService],
})
export class TaskProcessModule {}
