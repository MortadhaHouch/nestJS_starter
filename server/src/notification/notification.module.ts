/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationSchema } from './entities/notification.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [NotificationController],
  providers: [NotificationService],
  imports:[
    MongooseModule.forFeature([{name:'Notification',schema:NotificationSchema}]),
    forwardRef(()=>UserModule)
  ],
  exports:[NotificationService]
})
export class NotificationModule {}
