import { NotificationProcessesService } from './notification_processes.service';
import { CreateNotificationProcessDto } from './dto/create-notification_process.dto';
import { UpdateNotificationProcessDto } from './dto/update-notification_process.dto';
export declare class NotificationProcessesGateway {
    private readonly notificationProcessesService;
    constructor(notificationProcessesService: NotificationProcessesService);
    create(createNotificationProcessDto: CreateNotificationProcessDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(updateNotificationProcessDto: UpdateNotificationProcessDto): string;
    remove(id: number): string;
}
