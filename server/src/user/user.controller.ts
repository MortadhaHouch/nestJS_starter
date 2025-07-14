/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  Req,
  UnauthorizedException,
  HttpExceptionBody,
  ConflictException,
  BadRequestException,
  HttpStatus,
  NotFoundException
} from '@nestjs/common';
import { UserService } from './user.service';
import { IsObjectIdPipe } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { SignupUserDto } from './dto/signup-user.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}
  @Post("login")
  public async login(@Body(ValidationPipe) user:LoginUserDto){
    
    const foundUser = await this.userService.findUserByEmail(user.email);
    if(foundUser){
      const isValid = await this.userService.checkPassword(user.password,foundUser.password);
      if(isValid){
        const token = this.jwtService.sign(
          {email:user.email},
          {
            secret:process.env.SECRET_KEY as string,
            expiresIn:"7d"
          }
        );
        return {token};
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
  @Post("logout")
  public async logout(@Req() req: Request){
    const cookie = req.headers.get('Authorization');
    if(!cookie){
      throw new UnauthorizedException();
    }
    const token = cookie.startsWith("Bearer ") && cookie.slice(7);
    if(!token){
      throw new UnauthorizedException();
    }
    const {email} = this.jwtService.verify(token);
    const user = await this.userService.findUserByEmail(email as string);
    if(!user){
      throw new UnauthorizedException();
    }
    user.isLoggedIn = false;
    await user.save();
    return {message:"Logout successful"}
  }
}
