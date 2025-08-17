import { TaskPriority, TaskStatus } from '../types';
import { z } from 'zod';
import { BasicUserFieldsValidator } from './BasicUserFieldsValidator';

export const TaskOverviewValidator = z.object({
    _id: z.string(),
    title: z.string(),
    description: z.string(),
    status: z.nativeEnum(TaskStatus),
    priority: z.nativeEnum(TaskPriority),
    overdue: z.optional(z.string().datetime()),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});
export const ExpandedTaskOverviewValidator = z.object({
    ...TaskOverviewValidator.shape,
    comments: z.optional(z.array(z.string())),
    attachments: z.optional(z.array(z.string())),
    checklist: z.optional(z.array(z.object({
      name: z.string(),
      checked: z.boolean(),
      _id: z.string()
    }))),
    color: z.optional(z.string()),
    notes: z.optional(z.array(z.string())),
    assignees: z.optional(z.array(BasicUserFieldsValidator)),
})
export type TaskOverview = z.infer<typeof TaskOverviewValidator>;
export type ExpandedTaskOverview = z.infer<typeof ExpandedTaskOverviewValidator>;
