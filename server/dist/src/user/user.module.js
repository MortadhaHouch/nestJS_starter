"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_controller_1 = require("./user.controller");
const user_entity_1 = require("./entities/user.entity");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const request_entity_1 = require("./entities/request.entity");
const mailer_1 = require("@nestjs-modules/mailer");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const path_1 = require("path");
const bullmq_1 = require("@nestjs/bullmq");
const types_1 = require("../../utils/types");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: user_entity_1.User.name,
                    schema: user_entity_1.UserSchema
                },
                {
                    name: request_entity_1.FriendRequest.name,
                    schema: request_entity_1.FriendRequestSchema
                }
            ]),
            jwt_1.JwtModule.register({
                global: true,
                secret: process.env.SECRET_KEY,
                signOptions: {
                    expiresIn: "7d",
                },
            }),
            config_1.ConfigModule.forRoot(),
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: process.env.EMAIL_HOST,
                    secure: false,
                    port: Number(process.env.EMAIL_PORT),
                    auth: {
                        user: process.env.EMAIL_USERNAME,
                        pass: process.env.EMAIL_PASSWORD,
                    },
                },
                defaults: {
                    from: process.env.EMAIL_FROM,
                },
                template: {
                    dir: (0, path_1.join)(process.cwd(), 'templates'),
                    adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                    options: { strict: true },
                },
            }),
            bullmq_1.BullModule.registerQueue({
                name: types_1.ProcessName.GMAIL,
            }),
        ],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService],
        exports: [user_service_1.UserService],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map