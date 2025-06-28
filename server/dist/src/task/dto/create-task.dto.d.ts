import { TaskStatus } from "utils/types";
export declare class CreateTaskDto {
    title: string;
    description: string;
    status: TaskStatus;
    overdue?: Date;
}
