/* eslint-disable prettier/prettier */
import { IsString, MinLength } from "class-validator";
export class CreateTeamDto {
    @IsString({message:"Name must be a valid"})
    @MinLength(3,{message:"Name must be at least 3 characters long"})
    name:string;
    @IsString({message:"Description must be a valid"})
    @MinLength(3,{message:"Description must be at least 3 characters long"})
    description:string;
}
