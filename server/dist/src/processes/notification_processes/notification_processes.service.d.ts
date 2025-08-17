import { CreateNotificationProcessDto } from './dto/create-notification_process.dto';
import { UpdateNotificationProcessDto } from './dto/update-notification_process.dto';
export declare class NotificationProcessesService {
    create(createNotificationProcessDto: CreateNotificationProcessDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateNotificationProcessDto: UpdateNotificationProcessDto): string;
    remove(id: number): string;
}
