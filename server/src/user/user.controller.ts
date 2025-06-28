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
  UnauthorizedException 
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IsObjectIdPipe } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}
  @Post("login")
  public async login(user:CreateUserDto){
    const foundUser = await this.userService.findUserByEmail(user.email);
    if(foundUser){
      const isValid = await this.userService.checkPassword(user.password,foundUser.password);
      if(isValid){
        const token = this.jwtService.sign({email:user.email});
        return {token};
      }
      else{
        throw new UnauthorizedException();
      }
    }
  }
  @Post("signup")
  public async signup(user:CreateUserDto){
    const foundUser = await this.userService.findUserByEmail(user.email);
    if(foundUser){
      throw new UnauthorizedException();
    }
    const createdUser = await this.userService.create(user);
    const token = this.jwtService.sign({email:createdUser.email});
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
