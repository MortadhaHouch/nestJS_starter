/* eslint-disable prettier/prettier */

import { IsEmail, IsInt, IsString } from "class-validator";

export class OPTCode {
    @IsInt({
        message: 'code must be a number',
    })
    code:number
    @IsString({
        message: 'email must be a string',
    })
    @IsEmail()
    email:string
}