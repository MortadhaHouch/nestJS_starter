import { PartialType } from '@nestjs/mapped-types';
import { CreateNotificationProcessDto } from './create-notification_process.dto';

export class UpdateNotificationProcessDto extends PartialType(CreateNotificationProcessDto) {
  id: number;
}
