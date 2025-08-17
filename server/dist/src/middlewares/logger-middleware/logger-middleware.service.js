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
exports.LoggerMiddlewareService = void 0;
const jwt_1 = require("@nestjs/jwt");
const common_1 = require("@nestjs/common");
const user_service_1 = require("../../user/user.service");
let LoggerMiddlewareService = class LoggerMiddlewareService {
    userService;
    jwtService;
    logger;
    constructor(userService, jwtService, logger) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.logger = logger;
    }
    validateToken(token) {
        if (token.startsWith("Bearer ") && token.substring(7).length > 0) {
            const claims = this.jwtService.verify(token.substring(7), { secret: process.env.SECRET_KEY });
            if (new Date(claims.exp * 1000) > new Date() && new Date(claims.iat * 1000) < new Date()) {
                return claims;
            }
            return false;
        }
        return false;
    }
    async use(req, res, next) {
        const authHeader = req.headers['authorization'] || req.headers['Authorization'];
        const authString = Array.isArray(authHeader) ? authHeader[0] : authHeader;
        const authToken = authString && this.validateToken(authString);
        if (!authToken) {
            throw new common_1.UnauthorizedException("unauthorized");
        }
        const { email } = authToken;
        const user = await this.userService.findUserByEmail(email);
        if (!user) {
            throw new common_1.NotFoundException("user not found");
        }
        user.isLoggedIn = true;
        await user.save();
        req.user = user;
        next();
    }
};
exports.LoggerMiddlewareService = LoggerMiddlewareService;
__decorate([
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], LoggerMiddlewareService.prototype, "use", null);
exports.LoggerMiddlewareService = LoggerMiddlewareService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)("Logger")),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        common_1.Logger])
], LoggerMiddlewareService);
//# sourceMappingURL=logger-middleware.service.js.map