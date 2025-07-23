import { BlogCreatorValidator, BlogResponseValidator, BlogValidator, TaskOverviewValidator } from './validators';
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
export type TaskPriority = typeof TaskPriority[keyof typeof TaskPriority];
export type TaskOverview = z.infer<typeof TaskOverviewValidator>
export type Blog = z.infer<typeof BlogValidator>
export type BlogResponse = z.infer<typeof BlogResponseValidator>;
export type BlogCreator = z.infer<typeof BlogCreatorValidator>