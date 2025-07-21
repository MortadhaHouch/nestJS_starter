/* eslint-disable prettier/prettier */
import { BullModule } from '@nestjs/bullmq';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest_starter'),
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
      ttl:900*1000,
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
        host: 'localhost',
        port: 6379,
      },
    }),
    AuthProcessesModule,
  ],
  controllers: [AppController],
  providers: [AppService, LoggerMiddlewareService]
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddlewareService)
      .forRoutes('task','team','workspace','discussion','message','note','notification');
  }
}
