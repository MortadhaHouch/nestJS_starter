import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
export declare class UserController {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    login(user: CreateUserDto): Promise<{
        token: string;
    } | undefined>;
    signup(user: CreateUserDto): Promise<{
        token: string;
    }>;
    logout(req: Request): Promise<{
        message: string;
    }>;
}
