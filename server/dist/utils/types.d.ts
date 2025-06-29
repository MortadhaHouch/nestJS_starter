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
export interface AuthenticatedRequest extends Request {
    user: User;
}
export { TaskStatus, Role };
