/* eslint-disable prettier/prettier */
import { IsString, MinLength } from "class-validator";

export class CreateBlogDto {
    @IsString({message:"title should be a string"})
    @MinLength(3,{message:"title should be at least 3 chars"})
    title: string;
    @IsString({message:"content should be a string"})
    @MinLength(3,{message:"content should be at least 3 chars"})
    content: string;
}
