import { JwtService } from '@nestjs/jwt';
import { Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserService } from 'src/user/user.service';
import { AuthTokenPayload } from 'utils/types';
export declare class LoggerMiddlewareService implements NestMiddleware {
    private readonly userService;
    private readonly jwtService;
    private readonly logger;
    constructor(userService: UserService, jwtService: JwtService, logger: Logger);
    validateToken(token: string): false | AuthTokenPayload;
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
