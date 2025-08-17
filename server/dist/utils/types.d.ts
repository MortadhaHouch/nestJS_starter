import { User } from "src/user/entities/user.entity";
import { Request } from 'express';
declare enum TaskStatus {
    DONE = "DONE",
    PENDING = "PENDING",
    OVERDUE = "OVERDUE"
}
declare enum Role {
    USER = "USER",
    ADMIN = "ADMIN",
    SUPER_ADMIN = "SUPER_ADMIN"
}
declare enum TaskPriority {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH"
}
declare enum RequestStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
}
export interface AuthenticatedRequest extends Request {
    user: User;
}
declare enum WorkSpaceStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    DELETED = "DELETED"
}
export type CheckItem = {
    name: string;
    checked: boolean;
};
export declare enum NotificationType {
    TASK = "TASK",
    REQUEST = "REQUEST",
    WORKSPACE = "WORKSPACE",
    SOCIAL_MEDIA = "SOCIAL_MEDIA",
    ALL = "ALL"
}
export declare enum ProcessName {
    TASK = "TASK",
    REQUEST = "REQUEST",
    WORKSPACE = "WORKSPACE",
    SOCIAL_MEDIA = "SOCIAL_MEDIA",
    ALL = "ALL",
    GMAIL = "GMAIL",
    TEAM = "TEAM"
}
export declare enum ProfileAccessLevel {
    PUBLIC = "PUBLIC",
    PRIVATE = "PRIVATE",
    FRIENDS = "FRIENDS"
}
export type AuthTokenPayload = {
    email: string;
    id: string;
    iat: number;
    exp: number;
};
export { TaskStatus, Role, TaskPriority, WorkSpaceStatus, RequestStatus };
