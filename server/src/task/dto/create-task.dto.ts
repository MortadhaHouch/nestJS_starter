/* eslint-disable prettier/prettier */

import { IsDate, IsEnum, IsString } from "class-validator"
import { TaskStatus } from "utils/types"

export class CreateTaskDto {
    @IsString()
    title:string
    @IsString()
    description:string
    @IsEnum({values:Object.values(TaskStatus).map(k => k.toString())})
    status:TaskStatus
    @IsDate({always: true,message:"Overdue date is required"})    
    overdue?:Date
}
