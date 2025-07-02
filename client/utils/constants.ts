import { v4 } from 'uuid';
import { type TaskOverview, TaskPriority, TaskStatus } from './types';
export const tasks: TaskOverview[] = [
  {
    id: v4(),
    title: "Task 1",
    description: "Description for Task 1",
    status: TaskStatus.DONE,
    priority: TaskPriority.HIGH,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: v4(),
    title: "Task 2",
    description: "Description for Task 2",
    status: TaskStatus.PENDING,
    priority: TaskPriority.MEDIUM,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: v4(),
    title: "Task 3",
    description: "Description for Task 3",
    status: TaskStatus.OVERDUE,
    priority: TaskPriority.LOW,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: v4(),
    title: "Task 4",
    description: "Description for Task 4",
    status: TaskStatus.PENDING,
    priority: TaskPriority.HIGH,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: v4(),
    title: "Task 5",
    description: "Description for Task 5",
    status: TaskStatus.DONE,
    priority: TaskPriority.MEDIUM,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];