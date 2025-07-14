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
export interface AuthenticatedRequest extends Request {
    user: User;
}
declare enum WorkSpaceStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    DELETED = "DELETED"
}
export { TaskStatus, Role, TaskPriority, WorkSpaceStatus };
