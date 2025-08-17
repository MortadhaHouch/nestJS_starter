import { v4 } from 'uuid';
import { type TaskOverview, TaskPriority, TaskStatus } from './types';
export const tasks: TaskOverview[] = [
  {
    _id: v4(),
    title: "Task 1",
    description: "Description for Task 1",
    status: TaskStatus.DONE,
    priority: TaskPriority.HIGH,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: v4(),
    title: "Task 2",
    description: "Description for Task 2",
    status: TaskStatus.PENDING,
    priority: TaskPriority.MEDIUM,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: v4(),
    title: "Task 3",
    description: "Description for Task 3",
    status: TaskStatus.OVERDUE,
    priority: TaskPriority.LOW,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: v4(),
    title: "Task 4",
    description: "Description for Task 4",
    status: TaskStatus.PENDING,
    priority: TaskPriority.HIGH,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: v4(),
    title: "Task 5",
    description: "Description for Task 5",
    status: TaskStatus.DONE,
    priority: TaskPriority.MEDIUM,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
const getStatusColor = (status: TaskStatus) => {
  switch(status) {
    case TaskStatus.PENDING: return 'bg-yellow-100 text-yellow-800';
    case TaskStatus.OVERDUE: return 'bg-red-100 text-red-800';
    case TaskStatus.DONE: return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

const getPriorityColor = (priority: TaskPriority) => {
  switch(priority) {
    case TaskPriority.HIGH: return 'bg-red-100 text-red-800';
    case TaskPriority.MEDIUM: return 'bg-yellow-100 text-yellow-800';
    case TaskPriority.LOW: return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}
export {getStatusColor,getPriorityColor}