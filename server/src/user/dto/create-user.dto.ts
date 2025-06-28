/* eslint-disable prettier/prettier */

import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
    @IsString({always: true,message:"First name is required"})
    firstName: string;
    @IsString({always: true,message:"Last name is required"})
    lastName: string;
    @IsString({always: true,message:"Email is required"})
    @IsEmail()
    email: string;
    @IsString({always: true,message:"Password is required"})
    password: string;
}
