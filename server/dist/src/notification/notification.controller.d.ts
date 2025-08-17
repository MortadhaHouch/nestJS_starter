import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { AuthenticatedRequest, NotificationType } from 'utils/types';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    create(createNotificationDto: CreateNotificationDto): Promise<import("mongoose").Document<unknown, {}, import("./entities/notification.entity").Notification, {}> & import("./entities/notification.entity").Notification & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findAll(req: AuthenticatedRequest, p?: number): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../user/entities/user.entity").User, {}> & import("../user/entities/user.entity").User & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("../user/entities/user.entity").User, {}> & import("../user/entities/user.entity").User & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }, {}, import("../user/entities/user.entity").User, "findOne", {}>;
    findOne(req: AuthenticatedRequest): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./entities/notification.entity").Notification, {}> & import("./entities/notification.entity").Notification & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("./entities/notification.entity").Notification, {}> & import("./entities/notification.entity").Notification & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }, {}, import("./entities/notification.entity").Notification, "findOne", {}>;
    findByStatus(req: AuthenticatedRequest, status?: NotificationType, p?: number): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./entities/notification.entity").Notification, {}> & import("./entities/notification.entity").Notification & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, import("./entities/notification.entity").Notification, {}> & import("./entities/notification.entity").Notification & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }, {}, import("./entities/notification.entity").Notification, "find", {}>;
}
