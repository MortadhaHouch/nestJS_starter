import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { NotificationProcessesService } from './notification_processes.service';
import { CreateNotificationProcessDto } from './dto/create-notification_process.dto';
import { UpdateNotificationProcessDto } from './dto/update-notification_process.dto';

@WebSocketGateway()
export class NotificationProcessesGateway {
  constructor(private readonly notificationProcessesService: NotificationProcessesService) {}

  @SubscribeMessage('createNotificationProcess')
  create(@MessageBody() createNotificationProcessDto: CreateNotificationProcessDto) {
    return this.notificationProcessesService.create(createNotificationProcessDto);
  }

  @SubscribeMessage('findAllNotificationProcesses')
  findAll() {
    return this.notificationProcessesService.findAll();
  }

  @SubscribeMessage('findOneNotificationProcess')
  findOne(@MessageBody() id: number) {
    return this.notificationProcessesService.findOne(id);
  }

  @SubscribeMessage('updateNotificationProcess')
  update(@MessageBody() updateNotificationProcessDto: UpdateNotificationProcessDto) {
    return this.notificationProcessesService.update(updateNotificationProcessDto.id, updateNotificationProcessDto);
  }

  @SubscribeMessage('removeNotificationProcess')
  remove(@MessageBody() id: number) {
    return this.notificationProcessesService.remove(id);
  }
}
