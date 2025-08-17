import { Injectable } from '@nestjs/common';
import { CreateNotificationProcessDto } from './dto/create-notification_process.dto';
import { UpdateNotificationProcessDto } from './dto/update-notification_process.dto';

@Injectable()
export class NotificationProcessesService {
  create(createNotificationProcessDto: CreateNotificationProcessDto) {
    return 'This action adds a new notificationProcess';
  }

  findAll() {
    return `This action returns all notificationProcesses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notificationProcess`;
  }

  update(id: number, updateNotificationProcessDto: UpdateNotificationProcessDto) {
    return `This action updates a #${id} notificationProcess`;
  }

  remove(id: number) {
    return `This action removes a #${id} notificationProcess`;
  }
}
