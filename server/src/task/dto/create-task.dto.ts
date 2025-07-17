/* eslint-disable prettier/prettier */

import { IsDateString, IsEnum, IsString, IsOptional, IsArray } from "class-validator"
import { Transform } from "class-transformer"
import { CheckItem, TaskPriority, TaskStatus } from "utils/types"

export class CreateTaskDto {
    @IsString()
    title:string
    @IsString()
    description:string
    @IsOptional()
    @IsEnum(TaskStatus)
    @Transform(({ value }: { value: TaskStatus | undefined }) => value || TaskStatus.PENDING)
    status?:TaskStatus
    @IsOptional()
    @IsDateString()
    @Transform(({ value }: { value: string | Date | undefined }) => {
        if (!value) {
            return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
        }
        return typeof value === 'string' ? value : value.toISOString();
    })
    overdue?:string
    @IsArray()
    @IsOptional()
    @Transform(({ value }: { value: string[] | undefined }) => value || [])
    tags?:string[]
    @IsOptional()
    @IsEnum(TaskPriority)
    @Transform(({ value }: { value: TaskPriority | undefined }) => value || TaskPriority.MEDIUM)
    priority?:TaskPriority
    @IsOptional()
    @IsArray()
    @Transform(({ value }: { value: string[] | undefined }) => value || [])
    assignees?:string[]
    @IsOptional()
    @IsArray()
    @Transform(({ value }: { value: string[] | undefined }) => value || [])
    attachments?:string[]
    @IsOptional()
    @IsArray()
    @Transform(({ value }: { value: CheckItem[] | undefined }) => value || [])
    checklist?:CheckItem[]
    @IsOptional()
    @IsString()
    color:string
    @IsOptional()
    @IsString()
    notes:string
}
