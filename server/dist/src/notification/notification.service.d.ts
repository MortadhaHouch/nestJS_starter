import { CreateNotificationDto } from './dto/create-notification.dto';
import { Model, ObjectId } from 'mongoose';
import { Notification } from './entities/notification.entity';
import { User } from 'src/user/entities/user.entity';
import { NotificationType } from 'utils/types';
export declare class NotificationService {
    private readonly notificationModel;
    private readonly userModel;
    constructor(notificationModel: Model<Notification>, userModel: Model<User>);
    create(createNotificationDto: CreateNotificationDto): string;
    findAll(id: ObjectId, p?: number): import("mongoose").Query<(import("mongoose").Document<unknown, {}, User, {}> & User & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, User, {}> & User & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }, {}, User, "findOne", {}>;
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
