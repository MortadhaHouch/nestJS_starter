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
enum RequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}
export interface AuthenticatedRequest extends Request {
  user: User;
}
enum WorkSpaceStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DELETED = 'DELETED',
}
export type CheckItem = {
  name: string;
  checked: boolean;
}
export enum NotificationType {
  TASK = 'TASK',
  REQUEST = 'REQUEST',
  WORKSPACE = 'WORKSPACE',
  SOCIAL_MEDIA = 'SOCIAL_MEDIA',
  ALL = 'ALL',
}
export enum ProcessName {
  TASK = 'TASK',
  REQUEST = 'REQUEST',
  WORKSPACE = 'WORKSPACE',
  SOCIAL_MEDIA = 'SOCIAL_MEDIA',
  ALL = 'ALL',
  GMAIL = 'GMAIL',
  TEAM= "TEAM"
}
export enum ProfileAccessLevel {
  PUBLIC="PUBLIC",
  PRIVATE="PRIVATE",
  FRIENDS="FRIENDS"
}
export type AuthTokenPayload = {
  email:string,
  id:string
  iat:number,
  exp:number
}
export { TaskStatus, Role, TaskPriority,WorkSpaceStatus,RequestStatus };
