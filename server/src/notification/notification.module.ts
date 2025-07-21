/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationSchema } from './entities/notification.entity';

@Module({
  controllers: [NotificationController],
  providers: [NotificationService],
  imports:[
    MongooseModule.forFeature([{name:'Notification',schema:NotificationSchema}])
  ]
})
export class NotificationModule {}
