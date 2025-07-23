import { UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { SignupUserDto } from './dto/signup-user.dto';
import { OPTCode } from './dto/otp-user.dto';
import { AuthenticatedRequest } from 'utils/types';
import { UpdateUserDto } from './dto/update-user.dto';
import { Queue } from 'bullmq';
import { Cache } from 'cache-manager';
export declare class UserController {
    private readonly userService;
    private readonly jwtService;
    private readonly notificationJob;
    private cacheManager;
    constructor(userService: UserService, jwtService: JwtService, notificationJob: Queue, cacheManager: Cache);
    getData(req: AuthenticatedRequest): Promise<{} | undefined>;
    login(user: LoginUserDto, ip: string): Promise<UnauthorizedException | {
        message: string;
    }>;
    validate(opt: OPTCode): Promise<UnauthorizedException | {
        token: string;
        data: {
            email: string;
            firstName: string;
            lastName: string;
        };
    }>;
    signup(user: SignupUserDto): Promise<{
        token: string;
    }>;
    updatePassword(user: UpdateUserDto, req: AuthenticatedRequest): Promise<void>;
    logout(req: AuthenticatedRequest): Promise<{
        success_message: string;
    }>;
}
