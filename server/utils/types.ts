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
export interface AuthenticatedRequest extends Request {
  user: User;
}
export { TaskStatus, Role };
