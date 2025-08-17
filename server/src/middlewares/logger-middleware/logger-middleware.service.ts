/* eslint-disable prettier/prettier */
import { JwtService } from '@nestjs/jwt';

import { Inject, Injectable, Logger, NestMiddleware, NotFoundException, Req, Res, UnauthorizedException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserService } from 'src/user/user.service';
import { AuthenticatedRequest, AuthTokenPayload } from 'utils/types';
@Injectable()
export class LoggerMiddlewareService implements NestMiddleware {
    constructor(
        private readonly userService:UserService,
        private readonly jwtService:JwtService,
        @Inject("Logger") private readonly logger:Logger
    ){
    }
    validateToken(token:string){
        if(token.startsWith("Bearer ") && token.substring(7).length > 0){
            const claims = this.jwtService.verify<AuthTokenPayload>(token.substring(7),{secret:process.env.SECRET_KEY});
            if(new Date(claims.exp*1000) > new Date() && new Date(claims.iat*1000) < new Date()){
                return claims;
            }
            return false;
        }
        return false;
    }
    async use(@Req() req: Request,@Res() res: Response, next: NextFunction) {
        const authHeader = req.headers['authorization'] || req.headers['Authorization'];
        const authString = Array.isArray(authHeader) ? authHeader[0] : authHeader;
        const authToken = authString && this.validateToken(authString);
        if(!authToken){
            throw new UnauthorizedException("unauthorized");
        }
        // this.logger.log(authToken);
        const {email} = authToken;
        const user = await this.userService.findUserByEmail(email);
        if(!user){
            throw new NotFoundException("user not found");
        }
        user.isLoggedIn = true;
        await user.save();
        (req as AuthenticatedRequest).user = user;
        
        next();
    }
}
