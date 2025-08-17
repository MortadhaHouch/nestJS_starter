import { UserService } from 'src/user/user.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Model, ObjectId } from 'mongoose';
import { Notification } from './entities/notification.entity';
import { NotificationType } from 'utils/types';
export declare class NotificationService {
    private readonly notificationModel;
    private readonly userService;
    constructor(notificationModel: Model<Notification>, userService: UserService);
    create(createNotificationDto: CreateNotificationDto): Promise<import("mongoose").Document<unknown, {}, Notification, {}> & Notification & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findAll(id: ObjectId, p?: number): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../user/entities/user.entity").User, {}> & import("../user/entities/user.entity").User & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("../user/entities/user.entity").User, {}> & import("../user/entities/user.entity").User & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }, {}, import("../user/entities/user.entity").User, "findOne", {}>;
    findByStatus(id: ObjectId, status?: NotificationType, p?: number): import("mongoose").Query<(import("mongoose").Document<unknown, {}, Notification, {}> & Notification & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, Notification, {}> & Notification & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }, {}, Notification, "find", {}>;
    findOne(id: ObjectId): import("mongoose").Query<(import("mongoose").Document<unknown, {}, Notification, {}> & Notification & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, Notification, {}> & Notification & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }, {}, Notification, "findOne", {}>;
}
