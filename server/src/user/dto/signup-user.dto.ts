/* eslint-disable prettier/prettier */
import { IsString, MinLength } from "class-validator"
import { LoginUserDto } from "./login-user.dto"

export class SignupUserDto extends LoginUserDto {
    @IsString()
    @MinLength(3,{
        always:true,
        message:"firstName should be at least 3 chars"
    })
    firstName:string;
    @IsString()
    @MinLength(3,{
        always:true,
        message:"lastName should be at least 3 chars"
    })
    lastName:string;
}
