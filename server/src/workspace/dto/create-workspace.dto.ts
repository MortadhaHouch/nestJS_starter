/* eslint-disable prettier/prettier */
import { Transform } from "class-transformer"
import { IsEnum, IsOptional, IsString } from "class-validator"
import { WorkSpaceStatus } from "utils/types"

export class CreateWorkspaceDto {
    @IsString()
    title: string

    @IsString()
    description: string
    @IsOptional()
    @IsEnum(WorkSpaceStatus)
    @Transform(({ value }: { value: WorkSpaceStatus | undefined }) => value || WorkSpaceStatus.ACTIVE)
    status: WorkSpaceStatus
}
