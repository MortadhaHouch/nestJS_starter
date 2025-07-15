import { UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { SignupUserDto } from './dto/signup-user.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { OPTCode } from './dto/otp-user.dto';
export declare class UserController {
    private readonly userService;
    private readonly jwtService;
    private readonly mailService;
    constructor(userService: UserService, jwtService: JwtService, mailService: MailerService);
    login(user: LoginUserDto): Promise<UnauthorizedException | {
        message: string;
    }>;
    validate(opt: OPTCode): Promise<{
        token: string;
    }>;
    signup(user: SignupUserDto): Promise<{
        token: string;
    }>;
    logout(req: Request): Promise<{
        message: string;
    }>;
}
