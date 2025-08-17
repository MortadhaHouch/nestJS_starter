/* eslint-disable prettier/prettier */
import { IsString, MinLength } from "class-validator";

export class CreateCommentDto {
    @IsString({message:"Content must be a string"})
    @MinLength(1,{message:"Content must be at least 1 character long"})
    content: string;
}
