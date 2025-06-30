/* eslint-disable prettier/prettier */


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
    ConfigModule.forRoot(),
    CacheModule.register({
      ttl:900*1000,
      isGlobal:true,
    })
  ],
  controllers: [AppController],
  providers: [AppService, LoggerMiddlewareService]
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddlewareService)
      .forRoutes('task');
  }
}
