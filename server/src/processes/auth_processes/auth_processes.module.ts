/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { NotificationProcesses } from './auth_processes';
import { BullModule } from '@nestjs/bullmq';
import { ProcessName } from 'utils/types';

@Module({
  imports: [
    BullModule.registerQueue({
      name: ProcessName.GMAIL,
    }),
  ],
  providers: [NotificationProcesses],
})
export class AuthProcessesModule {} 