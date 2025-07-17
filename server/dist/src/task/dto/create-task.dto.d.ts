import { CheckItem, TaskPriority, TaskStatus } from "utils/types";
export declare class CreateTaskDto {
    title: string;
    description: string;
    status?: TaskStatus;
    overdue?: string;
    tags?: string[];
    priority?: TaskPriority;
    assignees?: string[];
    attachments?: string[];
    checklist?: CheckItem[];
    color: string;
    notes: string;
}
