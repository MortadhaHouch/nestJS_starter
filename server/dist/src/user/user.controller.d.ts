import { UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { SignupUserDto } from './dto/signup-user.dto';
export declare class UserController {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    login(user: LoginUserDto): Promise<UnauthorizedException | {
        token: string;
    }>;
    signup(user: SignupUserDto): Promise<{
        token: string;
    }>;
    logout(req: Request): Promise<{
        message: string;
    }>;
}
