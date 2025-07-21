/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Notification } from './entities/notification.entity';
import { User } from 'src/user/entities/user.entity';
import { NotificationType } from 'utils/types';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel("Notification") private readonly notificationModel:Model<Notification>,
    @InjectModel("User") private readonly userModel:Model<User>
  ) {

  }
  create(createNotificationDto: CreateNotificationDto) {
    return 'This action adds a new notification';
  }

  findAll(id:ObjectId,p?:number) {
    return this.userModel.findById(id).populate("notifications").skip(p?p*10:0).limit(10);
  }
  findByStatus(id:ObjectId,status?:NotificationType,p?:number) {
    const query = {
      creator:id
    }
    if(status){
      query["type"] = status
    }
    if(status){
      return this.notificationModel.find(query).skip(p?p*10:0).limit(10);
    }
    return this.notificationModel.find({creator:id}).skip(p?p*10:0).limit(10);
  }
  findOne(id: ObjectId) {
    return this.notificationModel.findById(id);
  }
}
