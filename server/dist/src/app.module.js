"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const mongoose_1 = require("@nestjs/mongoose");
const user_module_1 = require("./user/user.module");
const throttler_1 = require("@nestjs/throttler");
const task_module_1 = require("./task/task.module");
const config_1 = require("@nestjs/config");
const logger_middleware_service_1 = require("./middlewares/logger-middleware/logger-middleware.service");
const cache_manager_1 = require("@nestjs/cache-manager");
const team_module_1 = require("./team/team.module");
const note_module_1 = require("./note/note.module");
const notification_module_1 = require("./notification/notification.module");
const workspace_module_1 = require("./workspace/workspace.module");
const discussion_module_1 = require("./discussion/discussion.module");
const message_module_1 = require("./message/message.module");
const auth_processes_module_1 = require("./processes/auth_processes/auth_processes.module");
const task_process_module_1 = require("./processes/task_process/task_process.module");
const blog_module_1 = require("./blog/blog.module");
const comment_module_1 = require("./comment/comment.module");
const constants_1 = require("../utils/constants");
const notification_processes_module_1 = require("./processes/notification_processes/notification_processes.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(logger_middleware_service_1.LoggerMiddlewareService)
            .forRoutes(...constants_1.utils.protectedRoutes, ...constants_1.blogsCORSConfig, ...constants_1.commentsCORSConfig, ...constants_1.usersCORSConfig);
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot(process.env.MONGO_URL),
            user_module_1.UserModule,
            throttler_1.ThrottlerModule.forRoot({
                throttlers: [
                    {
                        ttl: 60000,
                        limit: 10,
                    },
                ],
            }),
            task_module_1.TaskModule,
            config_1.ConfigModule.forRoot({
                envFilePath: '.env',
                isGlobal: true,
            }),
            cache_manager_1.CacheModule.register({
                ttl: 60 * 1000,
                isGlobal: true,
            }),
            team_module_1.TeamModule,
            note_module_1.NoteModule,
            notification_module_1.NotificationModule,
            workspace_module_1.WorkspaceModule,
            discussion_module_1.DiscussionModule,
            message_module_1.MessageModule,
            bullmq_1.BullModule.forRoot({
                connection: {
                    host: process.env.REDIS_HOST,
                    port: Number(process.env.REDIS_PORT),
                },
            }),
            auth_processes_module_1.AuthProcessesModule,
            task_process_module_1.TaskProcessModule,
            blog_module_1.BlogModule,
            comment_module_1.CommentModule,
            notification_processes_module_1.NotificationProcessesModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, logger_middleware_service_1.LoggerMiddlewareService, { provide: "Logger", useClass: common_1.Logger }]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map