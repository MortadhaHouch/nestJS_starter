/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Req,
  UnauthorizedException,
  ConflictException,
  Patch,
} from '@nestjs/common';
import * as requestIp from 'request-ip';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { SignupUserDto } from './dto/signup-user.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { OPTCode } from './dto/otp-user.dto';
import { utils } from 'utils/constants';
import { RealIP } from 'nestjs-real-ip';
import { AuthenticatedRequest } from 'utils/types';
import { UpdateUserDto } from './dto/update-user.dto';
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailService:MailerService
  ) {}
  @Post("login")
  public async login(@Body(ValidationPipe) user:LoginUserDto,@RealIP() ip: string){
    const foundUser = await this.userService.findUserByEmail(user.email);
    const reqIP = requestIp.getClientIp(ip);
    if(foundUser){
      const isValid = await this.userService.checkPassword(user.password,foundUser.password);
      if(isValid){
        foundUser.validationCode = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
        foundUser.latestLoginTrial = new Date();
        foundUser.ip = reqIP;
        await foundUser.save();
        const emailSend = await this.mailService.sendMail({
          to:foundUser.email,
          subject:"Login successful",
          text:"Login successful",
          template:'reset-password',
          context:{
            verificationCode:foundUser.validationCode,
            content:`Welcome back ${foundUser.firstName} ${foundUser.lastName} , thanks for joining us`,
            year:new Date().getFullYear()
          }
        })
        return {
          message:"we have sent you a validation code to your email address please check your inbox",
        }
      }
      else{
        throw new UnauthorizedException({
          message:"invalid password"
        });
      }
    }else{
      return new UnauthorizedException({
        message:"user not found"
      });
    }
  }
  @Post("validate")
  public async validate(@Body(ValidationPipe) opt:OPTCode){
    const foundUser = await this.userService.findUserByEmail(opt.email);
    if(foundUser){
      const timeDiff = new Date().getTime() - foundUser.latestLoginTrial.getTime();
      if(timeDiff > utils.verificationCodeValidity){
        return new UnauthorizedException({
          expiry_message_error:"code expired please try again"
        });
      }else{
        if(foundUser.validationCode === opt.code){
          const token = this.jwtService.sign(
            {email:foundUser.email},
            {
              secret:process.env.SECRET_KEY as string,
              expiresIn:"7d"
            }
          );
          foundUser.isLoggedIn = true;
          foundUser.validationCode = 0;
          await foundUser.save();
          return {token};
        }else{
          throw new UnauthorizedException({
            message:"invalid code"
          });
        }
      }
    }
    else{
      throw new UnauthorizedException({
        message:"user not found"
      });
    }
  }
  @Post("signup")
  public async signup(@Body(ValidationPipe) user:SignupUserDto){
    const userByName = await this.userService.findUserByName({firstName:user.firstName,lastName:user.lastName});
    if(userByName){
      throw new ConflictException({
        message:"user with this name already exists",
      });
    }
    const foundUser = await this.userService.findUserByEmail(user.email);
    if(foundUser){
      throw new ConflictException({
        message:"user with this email already exists",
      });
    }
    const hashedPassword = await this.userService.hashPassword(user.password,10);
    const createdUser = await this.userService.create({...user,password:hashedPassword});
    const token = this.jwtService.sign(
      {email:createdUser.email},
      {
        secret:process.env.SECRET_KEY as string,
        expiresIn:"7d"
      }
    );
    return {token};
  }
  @Patch("/update-profile")
  public async updatePassword(@Body(ValidationPipe) user:UpdateUserDto,@Req() req:AuthenticatedRequest){
    const foundUser = await this.userService.findUserByEmail(req.user.email);
    if(foundUser){
      if(user.firstName){
        foundUser.firstName = user.firstName
      }
      if(user.lastName){
        foundUser.lastName = user.lastName
      }
      if(user.password){
        const hashedPassword = await this.userService.hashPassword(user.password,10);
        foundUser.password = hashedPassword
      }
    }
  }
  @Post("logout")
  public async logout(@Req() req: AuthenticatedRequest){
    const foundUser = await this.userService.findUserByEmail(req.user.email);
    if(!foundUser){
      throw new UnauthorizedException({
        error_message:"user not found"
      });
    }
    foundUser.isLoggedIn = false;
    await foundUser.save();
    return {success_message:"Logout successful"}
  }
}
