/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationSchema } from './entities/notification.entity';
import { UserSchema } from 'src/user/entities/user.entity';

@Module({
  controllers: [NotificationController],
  providers: [NotificationService],
  imports:[
    MongooseModule.forFeature([{name:'Notification',schema:NotificationSchema}]),
    MongooseModule.forFeature([{name:'User',schema:UserSchema}])
  ]
})
export class NotificationModule {}
