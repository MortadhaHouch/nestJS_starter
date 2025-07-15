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
const mailer_1 = require("@nestjs-modules/mailer");
const otp_user_dto_1 = require("./dto/otp-user.dto");
let UserController = class UserController {
    userService;
    jwtService;
    mailService;
    constructor(userService, jwtService, mailService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.mailService = mailService;
    }
    async login(user) {
        const foundUser = await this.userService.findUserByEmail(user.email);
        if (foundUser) {
            const isValid = await this.userService.checkPassword(user.password, foundUser.password);
            if (isValid) {
                foundUser.validationCode = Math.floor(Math.random() * 1000000);
                await foundUser.save();
                const emailSend = await this.mailService.sendMail({
                    to: foundUser.email,
                    subject: "Login successful",
                    text: "Login successful",
                    template: 'index',
                    context: {
                        verificationCode: foundUser.validationCode,
                        message: `
              Thank you for logging in, your verification code is ${foundUser.validationCode}
              <br/>
              <p>Best Regards</p>
              <h2>Please copy the code above</h2>
              <h3>Please do not reply to this email</h3>
            `
                    }
                });
                return {
                    message: "we have sent you a validation code to your email address please check your inbox",
                };
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
    async validate(opt) {
        const foundUser = await this.userService.findUserByEmail(opt.email);
        if (foundUser) {
            if (foundUser.validationCode === opt.code) {
                const token = this.jwtService.sign({ email: foundUser.email }, {
                    secret: process.env.SECRET_KEY,
                    expiresIn: "7d"
                });
                foundUser.isLoggedIn = true;
                foundUser.validationCode = 0;
                await foundUser.save();
                return { token };
            }
            else {
                throw new common_1.UnauthorizedException({
                    message: "invalid code"
                });
            }
        }
        else {
            throw new common_1.UnauthorizedException({
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
    (0, common_1.Post)("validate"),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [otp_user_dto_1.OPTCode]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "validate", null);
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
        jwt_1.JwtService,
        mailer_1.MailerService])
], UserController);
//# sourceMappingURL=user.controller.js.map