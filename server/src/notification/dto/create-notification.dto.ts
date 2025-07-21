/* eslint-disable prettier/prettier */
import { Transform } from "class-transformer"
import { IsEnum, IsOptional, IsString } from "class-validator"
import { NotificationType } from "utils/types"

export class CreateNotificationDto {
    @IsString({message:"title should be a string"})
    content:string
    @IsOptional({message:"type should be a string"})
    @IsString({message:"type should be a string"})
    @IsEnum(NotificationType)
    @Transform(({ value }: { value: NotificationType | undefined }) => value || NotificationType.ALL)
    type:string
}
