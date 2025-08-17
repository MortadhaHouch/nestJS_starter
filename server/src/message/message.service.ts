/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Model } from 'mongoose';
import { Message } from './entities/message.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel('Message') private messageModel: Model<Message>,
  ) {}

  create(createMessageDto: CreateMessageDto) {
    const createdMessage = new this.messageModel(createMessageDto);
    return createdMessage.save();
  }

  findAll() {
    return this.messageModel.find().exec();
  }

  findOne(id: string) {
    return this.messageModel.findById(id).exec();
  }

  update(id: string, updateMessageDto: UpdateMessageDto) {
    return this.messageModel.findByIdAndUpdate(id, updateMessageDto).exec();
  }

  remove(id: string) {
    return this.messageModel.findByIdAndDelete(id).exec();
  }
}
