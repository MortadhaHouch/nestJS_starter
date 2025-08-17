import { Module } from '@nestjs/common';
import { NotificationProcessesService } from './notification_processes.service';
import { NotificationProcessesGateway } from './notification_processes.gateway';

@Module({
  providers: [NotificationProcessesGateway, NotificationProcessesService],
})
export class NotificationProcessesModule {}
