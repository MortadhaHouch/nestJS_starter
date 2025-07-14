"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
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
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(logger_middleware_service_1.LoggerMiddlewareService)
            .forRoutes('task', 'team', 'workspace', 'discussion', 'message', 'note', 'notification');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot('mongodb://localhost:27017/nest_starter'),
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
                ttl: 900 * 1000,
                isGlobal: true,
            }),
            team_module_1.TeamModule,
            note_module_1.NoteModule,
            notification_module_1.NotificationModule,
            workspace_module_1.WorkspaceModule,
            discussion_module_1.DiscussionModule,
            message_module_1.MessageModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, logger_middleware_service_1.LoggerMiddlewareService]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map