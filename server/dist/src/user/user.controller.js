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
const create_user_dto_1 = require("./dto/create-user.dto");
const jwt_1 = require("@nestjs/jwt");
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
                const token = this.jwtService.sign({ email: user.email });
                return { token };
            }
            else {
                throw new common_1.UnauthorizedException();
            }
        }
    }
    async signup(user) {
        const foundUser = await this.userService.findUserByEmail(user.email);
        if (foundUser) {
            throw new common_1.UnauthorizedException();
        }
        const createdUser = await this.userService.create(user);
        const token = this.jwtService.sign({ email: createdUser.email });
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
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Post)("signup"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
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