/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { NotificationProcesses } from './auth_processes';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'auth-processes',
    }),
  ],
  providers: [NotificationProcesses],
})
export class AuthProcessesModule {} 