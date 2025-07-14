/* eslint-disable prettier/prettier */

import { User } from "src/user/entities/user.entity";
import { Request } from 'express';

enum TaskStatus {
  DONE = 'DONE',
  PENDING = 'PENDING',
  OVERDUE = 'OVERDUE',
}
enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}
enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}
export interface AuthenticatedRequest extends Request {
  user: User;
}
enum WorkSpaceStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DELETED = 'DELETED',
}
export { TaskStatus, Role, TaskPriority,WorkSpaceStatus };
