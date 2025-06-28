/* eslint-disable prettier/prettier */
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: { 
        expiresIn: "7d",
      },
    })
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
