/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { BullModule } from '@nestjs/bullmq';

// Entities
import { UserSchema } from './entities/user.entity';
import { FriendRequestSchema } from './entities/request.entity';
// Services & Modules
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ProcessName } from 'utils/types';
import { TeamModule } from 'src/team/team.module';
import { WorkspaceModule } from 'src/workspace/workspace.module';
import { TaskModule } from 'src/task/task.module';
import { BlogModule } from 'src/blog/blog.module';
import { CommentModule } from 'src/comment/comment.module';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'FriendRequest', schema: FriendRequestSchema },
    ]),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: { 
        expiresIn: "7d",
      },
    }),
    ConfigModule.forRoot(),
    MailerModule.forRoot({
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
        dir: join(process.cwd(), 'templates'), // or just 'templates' if at the very top level
        adapter: new HandlebarsAdapter(),
        options: { strict: true },
      },
    }),
    BullModule.registerQueue({
      name: ProcessName.GMAIL,
    }),
    forwardRef(() => TeamModule),
    forwardRef(() => WorkspaceModule),
    forwardRef(() => TaskModule),
    forwardRef(() => BlogModule),
    forwardRef(() => CommentModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
