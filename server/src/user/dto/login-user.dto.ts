/* eslint-disable prettier/prettier */
import { IsEmail, IsString, IsStrongPassword } from "class-validator"

export class LoginUserDto {
    @IsString({message:"email should be a string"})
    @IsEmail()
    email:string
    @IsStrongPassword({
        minLength:8,
        minLowercase:3,
        minNumbers:3,
        minSymbols:1,
        minUppercase:1
    })
    password:string
}
