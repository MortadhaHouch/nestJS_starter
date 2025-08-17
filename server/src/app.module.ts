/* eslint-disable prettier/prettier */
import { BullModule } from '@nestjs/bullmq';
import { Logger, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { TaskModule } from './task/task.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddlewareService } from './middlewares/logger-middleware/logger-middleware.service';
import { CacheModule } from '@nestjs/cache-manager';
import { TeamModule } from './team/team.module';
import { NoteModule } from './note/note.module';
import { NotificationModule } from './notification/notification.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { DiscussionModule } from './discussion/discussion.module';
import { MessageModule } from './message/message.module';
import { AuthProcessesModule } from './processes/auth_processes/auth_processes.module';
import { TaskProcessModule } from './processes/task_process/task_process.module';
import { BlogModule } from './blog/blog.module';
import { CommentModule } from './comment/comment.module';
import { blogsCORSConfig, commentsCORSConfig, usersCORSConfig, utils } from 'utils/constants';
import { NotificationProcessesModule } from './processes/notification_processes/notification_processes.module';
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL as string),
    UserModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
    TaskModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    CacheModule.register({
      ttl:60*1000,
      isGlobal:true,
    }),
    TeamModule,
    NoteModule,
    NotificationModule,
    WorkspaceModule,
    DiscussionModule,
    MessageModule,
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST as string,
        port: Number(process.env.REDIS_PORT),
      },
    }),
    AuthProcessesModule,
    TaskProcessModule,
    BlogModule,
    CommentModule,
    NotificationProcessesModule,
  ],
  controllers: [AppController],
  providers: [AppService, LoggerMiddlewareService,{provide:"Logger",useClass:Logger}]
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddlewareService)
      .forRoutes(...utils.protectedRoutes,...blogsCORSConfig,...commentsCORSConfig,...usersCORSConfig);
  }
}
