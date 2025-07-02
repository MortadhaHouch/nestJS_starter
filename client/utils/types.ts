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

export type TaskOverview = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
};
