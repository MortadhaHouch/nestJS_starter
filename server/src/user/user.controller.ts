/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Req,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { SignupUserDto } from './dto/signup-user.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { OPTCode } from './dto/otp-user.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailService:MailerService
  ) {}
  @Post("login")
  public async login(@Body(ValidationPipe) user:LoginUserDto){
    const foundUser = await this.userService.findUserByEmail(user.email);
    if(foundUser){
      const isValid = await this.userService.checkPassword(user.password,foundUser.password);
      if(isValid){
        foundUser.validationCode = Math.floor(Math.random() * 1000000);
        await foundUser.save();
        const emailSend = await this.mailService.sendMail({
          to:foundUser.email,
          subject:"Login successful",
          text:"Login successful",
          template:'index',
          context:{
            verificationCode:foundUser.validationCode,
            message:`
              Thank you for logging in, your verification code is ${foundUser.validationCode}
              <br/>
              <p>Best Regards</p>
              <h2>Please copy the code above</h2>
              <h3>Please do not reply to this email</h3>
            `
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
