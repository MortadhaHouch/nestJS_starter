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
  Get,
  Inject,
  Param,
  Query,
  NotFoundException,
} from '@nestjs/common';
import * as requestIp from 'request-ip';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { SignupUserDto } from './dto/signup-user.dto';
import { OPTCode } from './dto/otp-user.dto';
import { utils } from 'utils/constants';
import { RealIP } from 'nestjs-real-ip';
import { AuthenticatedRequest, ProcessName } from 'utils/types';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { IsObjectIdPipe } from '@nestjs/mongoose';
import {ObjectId} from "mongoose"
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectQueue(ProcessName.GMAIL) private readonly notificationJob: Queue,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}
  @Get("find")
  public async findUsers(
    @Req() req:AuthenticatedRequest,
    @Query("email") email?:string,
    @Query("firstName")firstName?:string,
    @Query("lastName")lastName?:string
  ){
    return this.userService.findUserByNameOrEmail(req.user._id,{email,firstName,lastName});
  }
  @Get("dashboard")
  public async getDashboardData(@Req() req:AuthenticatedRequest){
    const statsSearchQuery = `user:${req.user.email}`;
    const stats = await this.cacheManager.get(statsSearchQuery);
    if(stats){
      return stats;
    }
    const userStats = await this.userService.getUserProfile(req.user._id);
    await this.cacheManager.set(statsSearchQuery,userStats);
    return {
      ...userStats,
      teams:userStats.teams
    }
  }
  @Get("profile/:id")
  public async getProfile(@Param("id",IsObjectIdPipe) id:ObjectId){
    return await this.userService.getUserProfile(id);
  }
  @Get("my-profile")
  public async getMyProfile(@Req() req:AuthenticatedRequest){
    const foundUser = await this.userService.getMyProfile(req.user._id);
    return {
      user:foundUser
    }
  }
  @Get("friends")
  public async getFriends(@Req() req:AuthenticatedRequest){
    const userData = await this.userService.getFriends(req.user._id);
    return userData?userData.friends:[];
  }
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
        await this.notificationJob.add("login",{
          email:foundUser.email,
          firstName:foundUser.firstName,
          lastName:foundUser.lastName,
          validationCode:foundUser.validationCode
        })
        return {
          success:"we have sent you a validation code to your email address please check your inbox",
        }
      }
      else{
        throw new UnauthorizedException({
          password_error:"invalid password"
        });
      }
    }else{
      throw new NotFoundException({
        email_error:"user not found"
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
            {
              email:foundUser.email,
              id:foundUser._id
            },
            {
              secret:process.env.SECRET_KEY as string,
              expiresIn:"7d"
            }
          );
          foundUser.isLoggedIn = true;
          foundUser.validationCode = 0;
          foundUser.otpTrialCount = 0;
          foundUser.firstOPTTrial = new Date();
          await foundUser.save();
          return {
            success:true,
            token,
            data:{
              email:foundUser.email,
              firstName:foundUser.firstName,
              lastName:foundUser.lastName
            }
          };
        }else{
          await this.notificationJob.add("access-failure",{
            email:foundUser.email,
            subject:"Login failed",
            text:"Login failed",
            template:'access-failure',
            verificationCode:foundUser.validationCode,
            content:`Dear ${foundUser.firstName} ${foundUser.lastName} , your login attempt has failed ,please try again or mark this action as spam`,
            year:new Date().getFullYear()
          })
          throw new UnauthorizedException({
            code_error:"invalid code"
          });
        }
      }
    }
    else{
      throw new UnauthorizedException({
        email_error:"user not found"
      });
    }
  }
  @Post("resend-opt")
  public async resendOpt(@Body(ValidationPipe) user:OPTCode,@RealIP() ip: string){
    const foundUser = await this.userService.findUserByEmail(user.email);
    if(foundUser){
      if(foundUser.otpTrialCount < utils.maxOPTTrial){
        const timeDiff = new Date().getTime() - foundUser.firstOPTTrial.getTime();
        if(timeDiff > utils.verificationCodeValidity){
          foundUser.otpTrialCount = 0;
          await foundUser.save();
          foundUser.validationCode = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
          foundUser.latestLoginTrial = new Date();
          foundUser.ip = ip;
          await foundUser.save();
          await this.notificationJob.add("login",{
            email:foundUser.email,
            firstName:foundUser.firstName,
            lastName:foundUser.lastName,
            validationCode:foundUser.validationCode
          })
          return {
            success:true,
            retry_message:"we have sent you a validation code to your email address please check your inbox",
          }
        }
      }else{
        throw new UnauthorizedException({
          otp_trial_error:"max opt trial reached"
        });
      }
    }else{
      throw new UnauthorizedException({
        email_error:"user not found"
      });
    }
  }
  @Post("signup")
  public async signup(@Body(ValidationPipe) user:SignupUserDto){
    const userByName = await this.userService.findUserByName({firstName:user.firstName,lastName:user.lastName});
    if(userByName){
      throw new ConflictException("user with this name already exists");
    }
    const foundUser = await this.userService.findUserByEmail(user.email);
    if(foundUser){
      throw new ConflictException("user with this email already exists");
    }
    const hashedPassword = await this.userService.hashPassword(user.password,10);
    const createdUser = await this.userService.create({...user,password:hashedPassword});
    const token = this.jwtService.sign(
      {
        email:createdUser.email,
        id:createdUser._id
      },
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
      await foundUser.save();
      return {
        success_message:"Profile updated successfully"
      }
    }
    throw new UnauthorizedException({
      email_error:"user not found"
    })
  }
  @Post("logout")
  public async logout(@Req() req: AuthenticatedRequest){
    const foundUser = await this.userService.findUserByEmail(req.user.email);
    if(!foundUser){
      throw new UnauthorizedException({
        email_error:"user not found"
      });
    }
    foundUser.isLoggedIn = false;
    await foundUser.save();
    return {success_message:"Logout successful"}
  }
}
