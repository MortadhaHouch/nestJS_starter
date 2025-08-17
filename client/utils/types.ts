import { BlogCreatorValidator, BlogResponseValidator, BlogValidator, CommentValidator, TaskOverviewValidator,BasicUserFieldsValidator,ProfileValidator, WorkspaceValidator, TeamValidator } from './validators/index';
import { z } from "zod"
export const TaskStatus = {
  DONE: 'DONE',
  PENDING: 'PENDING',
  OVERDUE: 'OVERDUE',
} as const;
export type TaskStatus = typeof TaskStatus[keyof typeof TaskStatus];

export const TaskPriority = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
} as const;
export const ProfileAccessLevel = {
  PUBLIC:"PUBLIC",
  PRIVATE:"PRIVATE",
  FRIENDS:"FRIENDS"
} as const;
export const WorkSpaceStatus = {
  ACTIVE : 'ACTIVE',
  INACTIVE : 'INACTIVE',
  DELETED : 'DELETED',
} as const
export type TaskPriority = typeof TaskPriority[keyof typeof TaskPriority];
export type ProfileAccessLevel = typeof ProfileAccessLevel[keyof typeof ProfileAccessLevel];
export type TaskOverview = z.infer<typeof TaskOverviewValidator>
export type Blog = z.infer<typeof BlogValidator>
export type Comment = z.infer<typeof CommentValidator>
export type BlogResponse = z.infer<typeof BlogResponseValidator>;
export type BlogCreator = z.infer<typeof BlogCreatorValidator>
export type User = z.infer<typeof BasicUserFieldsValidator>
export type Profile = z.infer<typeof ProfileValidator>
export type Workspace = z.infer<typeof WorkspaceValidator>
export type Team = z.infer<typeof TeamValidator>