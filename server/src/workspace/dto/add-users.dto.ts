/* eslint-disable prettier/prettier */
import { IsArray, IsString } from "class-validator";

export class AddUsersDto {
    @IsArray()
    @IsString({each: true})
    ids:string[]
}