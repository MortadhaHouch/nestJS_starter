/* eslint-disable prettier/prettier */

import { IsEmail, IsInt, IsString, Max, Min } from "class-validator";

export class OPTCode {
    @IsInt({
        message: 'code must be a number',
    })
    @Min(1000,{
        message:"minimum acceptable value is 1000"
    })
    @Max(9999,{
        message:"maximum acceptable value is 9999"
    })
    code:number
    @IsString({
        message: 'email must be a string',
    })
    @IsEmail()
    email:string
}