"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const jwt_1 = require("@nestjs/jwt");
const login_user_dto_1 = require("./dto/login-user.dto");
const signup_user_dto_1 = require("./dto/signup-user.dto");
let UserController = class UserController {
    userService;
    jwtService;
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async login(user) {
        const foundUser = await this.userService.findUserByEmail(user.email);
        if (foundUser) {
            const isValid = await this.userService.checkPassword(user.password, foundUser.password);
            if (isValid) {
                const token = this.jwtService.sign({ email: user.email }, {
                    secret: process.env.SECRET_KEY,
                    expiresIn: "7d"
                });
                return { token };
            }
            else {
                throw new common_1.UnauthorizedException({
                    message: "invalid password"
                });
            }
        }
        else {
            return new common_1.UnauthorizedException({
                message: "user not found"
            });
        }
    }
    async signup(user) {
        const userByName = await this.userService.findUserByName({ firstName: user.firstName, lastName: user.lastName });
        if (userByName) {
            throw new common_1.ConflictException({
                message: "user with this name already exists",
            });
        }
        const foundUser = await this.userService.findUserByEmail(user.email);
        if (foundUser) {
            throw new common_1.ConflictException({
                message: "user with this email already exists",
            });
        }
        const hashedPassword = await this.userService.hashPassword(user.password, 10);
        const createdUser = await this.userService.create({ ...user, password: hashedPassword });
        const token = this.jwtService.sign({ email: createdUser.email }, {
            secret: process.env.SECRET_KEY,
            expiresIn: "7d"
        });
        return { token };
    }
    async logout(req) {
        const cookie = req.headers.get('Authorization');
        if (!cookie) {
            throw new common_1.UnauthorizedException();
        }
        const token = cookie.startsWith("Bearer ") && cookie.slice(7);
        if (!token) {
            throw new common_1.UnauthorizedException();
        }
        const { email } = this.jwtService.verify(token);
        const user = await this.userService.findUserByEmail(email);
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        user.isLoggedIn = false;
        await user.save();
        return { message: "Logout successful" };
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)("login"),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_dto_1.LoginUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Post)("signup"),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_user_dto_1.SignupUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)("logout"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "logout", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], UserController);
//# sourceMappingURL=user.controller.js.map