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
const requestIp = require("request-ip");
const user_service_1 = require("./user.service");
const jwt_1 = require("@nestjs/jwt");
const login_user_dto_1 = require("./dto/login-user.dto");
const signup_user_dto_1 = require("./dto/signup-user.dto");
const otp_user_dto_1 = require("./dto/otp-user.dto");
const constants_1 = require("../../utils/constants");
const nestjs_real_ip_1 = require("nestjs-real-ip");
const types_1 = require("../../utils/types");
const update_user_dto_1 = require("./dto/update-user.dto");
const bullmq_1 = require("@nestjs/bullmq");
const bullmq_2 = require("bullmq");
const cache_manager_1 = require("@nestjs/cache-manager");
const mongoose_1 = require("@nestjs/mongoose");
let UserController = class UserController {
    userService;
    jwtService;
    notificationJob;
    cacheManager;
    constructor(userService, jwtService, notificationJob, cacheManager) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.notificationJob = notificationJob;
        this.cacheManager = cacheManager;
    }
    async findUsers(req, email, firstName, lastName) {
        return this.userService.findUserByNameOrEmail(req.user._id, { email, firstName, lastName });
    }
    async getDashboardData(req) {
        const statsSearchQuery = `user:${req.user.email}`;
        const stats = await this.cacheManager.get(statsSearchQuery);
        if (stats) {
            return stats;
        }
        const userStats = await this.userService.getUserProfile(req.user._id);
        await this.cacheManager.set(statsSearchQuery, userStats);
        return {
            ...userStats,
            teams: userStats.teams
        };
    }
    async getProfile(id) {
        return await this.userService.getUserProfile(id);
    }
    async getMyProfile(req) {
        const foundUser = await this.userService.getMyProfile(req.user._id);
        return {
            user: foundUser
        };
    }
    async getFriends(req) {
        const userData = await this.userService.getFriends(req.user._id);
        return userData ? userData.friends : [];
    }
    async login(user, ip) {
        const foundUser = await this.userService.findUserByEmail(user.email);
        const reqIP = requestIp.getClientIp(ip);
        if (foundUser) {
            const isValid = await this.userService.checkPassword(user.password, foundUser.password);
            if (isValid) {
                foundUser.validationCode = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
                foundUser.latestLoginTrial = new Date();
                foundUser.ip = reqIP;
                await foundUser.save();
                await this.notificationJob.add("login", {
                    email: foundUser.email,
                    firstName: foundUser.firstName,
                    lastName: foundUser.lastName,
                    validationCode: foundUser.validationCode
                });
                return {
                    success: "we have sent you a validation code to your email address please check your inbox",
                };
            }
            else {
                throw new common_1.UnauthorizedException({
                    password_error: "invalid password"
                });
            }
        }
        else {
            throw new common_1.NotFoundException({
                email_error: "user not found"
            });
        }
    }
    async validate(opt) {
        const foundUser = await this.userService.findUserByEmail(opt.email);
        if (foundUser) {
            const timeDiff = new Date().getTime() - foundUser.latestLoginTrial.getTime();
            if (timeDiff > constants_1.utils.verificationCodeValidity) {
                return new common_1.UnauthorizedException({
                    expiry_message_error: "code expired please try again"
                });
            }
            else {
                if (foundUser.validationCode === opt.code) {
                    const token = this.jwtService.sign({
                        email: foundUser.email,
                        id: foundUser._id
                    }, {
                        secret: process.env.SECRET_KEY,
                        expiresIn: "7d"
                    });
                    foundUser.isLoggedIn = true;
                    foundUser.validationCode = 0;
                    foundUser.otpTrialCount = 0;
                    foundUser.firstOPTTrial = new Date();
                    await foundUser.save();
                    return {
                        success: true,
                        token,
                        data: {
                            email: foundUser.email,
                            firstName: foundUser.firstName,
                            lastName: foundUser.lastName
                        }
                    };
                }
                else {
                    await this.notificationJob.add("access-failure", {
                        email: foundUser.email,
                        subject: "Login failed",
                        text: "Login failed",
                        template: 'access-failure',
                        verificationCode: foundUser.validationCode,
                        content: `Dear ${foundUser.firstName} ${foundUser.lastName} , your login attempt has failed ,please try again or mark this action as spam`,
                        year: new Date().getFullYear()
                    });
                    throw new common_1.UnauthorizedException({
                        code_error: "invalid code"
                    });
                }
            }
        }
        else {
            throw new common_1.UnauthorizedException({
                email_error: "user not found"
            });
        }
    }
    async resendOpt(user, ip) {
        const foundUser = await this.userService.findUserByEmail(user.email);
        if (foundUser) {
            if (foundUser.otpTrialCount < constants_1.utils.maxOPTTrial) {
                const timeDiff = new Date().getTime() - foundUser.firstOPTTrial.getTime();
                if (timeDiff > constants_1.utils.verificationCodeValidity) {
                    foundUser.otpTrialCount = 0;
                    await foundUser.save();
                    foundUser.validationCode = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
                    foundUser.latestLoginTrial = new Date();
                    foundUser.ip = ip;
                    await foundUser.save();
                    await this.notificationJob.add("login", {
                        email: foundUser.email,
                        firstName: foundUser.firstName,
                        lastName: foundUser.lastName,
                        validationCode: foundUser.validationCode
                    });
                    return {
                        success: true,
                        retry_message: "we have sent you a validation code to your email address please check your inbox",
                    };
                }
            }
            else {
                throw new common_1.UnauthorizedException({
                    otp_trial_error: "max opt trial reached"
                });
            }
        }
        else {
            throw new common_1.UnauthorizedException({
                email_error: "user not found"
            });
        }
    }
    async signup(user) {
        const userByName = await this.userService.findUserByName({ firstName: user.firstName, lastName: user.lastName });
        if (userByName) {
            throw new common_1.ConflictException("user with this name already exists");
        }
        const foundUser = await this.userService.findUserByEmail(user.email);
        if (foundUser) {
            throw new common_1.ConflictException("user with this email already exists");
        }
        const hashedPassword = await this.userService.hashPassword(user.password, 10);
        const createdUser = await this.userService.create({ ...user, password: hashedPassword });
        const token = this.jwtService.sign({
            email: createdUser.email,
            id: createdUser._id
        }, {
            secret: process.env.SECRET_KEY,
            expiresIn: "7d"
        });
        return { token };
    }
    async updatePassword(user, req) {
        const foundUser = await this.userService.findUserByEmail(req.user.email);
        if (foundUser) {
            if (user.firstName) {
                foundUser.firstName = user.firstName;
            }
            if (user.lastName) {
                foundUser.lastName = user.lastName;
            }
            if (user.password) {
                const hashedPassword = await this.userService.hashPassword(user.password, 10);
                foundUser.password = hashedPassword;
            }
            await foundUser.save();
            return {
                success_message: "Profile updated successfully"
            };
        }
        throw new common_1.UnauthorizedException({
            email_error: "user not found"
        });
    }
    async logout(req) {
        const foundUser = await this.userService.findUserByEmail(req.user.email);
        if (!foundUser) {
            throw new common_1.UnauthorizedException({
                email_error: "user not found"
            });
        }
        foundUser.isLoggedIn = false;
        await foundUser.save();
        return { success_message: "Logout successful" };
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)("find"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)("email")),
    __param(2, (0, common_1.Query)("firstName")),
    __param(3, (0, common_1.Query)("lastName")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findUsers", null);
__decorate([
    (0, common_1.Get)("dashboard"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getDashboardData", null);
__decorate([
    (0, common_1.Get)("profile/:id"),
    __param(0, (0, common_1.Param)("id", mongoose_1.IsObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Get)("my-profile"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getMyProfile", null);
__decorate([
    (0, common_1.Get)("friends"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getFriends", null);
__decorate([
    (0, common_1.Post)("login"),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, nestjs_real_ip_1.RealIP)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_dto_1.LoginUserDto, String]),
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
    (0, common_1.Post)("resend-opt"),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, nestjs_real_ip_1.RealIP)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [otp_user_dto_1.OPTCode, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "resendOpt", null);
__decorate([
    (0, common_1.Post)("signup"),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_user_dto_1.SignupUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signup", null);
__decorate([
    (0, common_1.Patch)("/update-profile"),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_dto_1.UpdateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updatePassword", null);
__decorate([
    (0, common_1.Post)("logout"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "logout", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __param(2, (0, bullmq_1.InjectQueue)(types_1.ProcessName.GMAIL)),
    __param(3, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        bullmq_2.Queue, Object])
], UserController);
//# sourceMappingURL=user.controller.js.map