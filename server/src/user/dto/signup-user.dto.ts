/* eslint-disable prettier/prettier */
import { IsEmail, IsString, IsStrongPassword, MinLength } from "class-validator"
import { LoginUserDto } from "./login-user.dto"

export class SignupUserDto extends LoginUserDto {
    @IsString()
    @MinLength(6,{
        always:true,
        message:"firstName should be at least 6 chars"
    })
    firstName:string;
    @IsString()
    @MinLength(6,{
        always:true,
        message:"lastName should be at least 6 chars"
    })
    lastName:string;
}
