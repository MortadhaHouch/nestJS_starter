import { JwtService } from '@nestjs/jwt';
import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserService } from 'src/user/user.service';
export declare class LoggerMiddlewareService implements NestMiddleware {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateToken(token: string): false | {
        email: string;
        iat: number;
        exp: number;
    };
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
