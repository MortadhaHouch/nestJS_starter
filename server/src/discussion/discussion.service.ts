/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateDiscussionDto } from './dto/create-discussion.dto';
import { UpdateDiscussionDto } from './dto/update-discussion.dto';
import { Model } from 'mongoose';
import { Discussion } from './entities/discussion.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class DiscussionService {
  constructor(
    @InjectModel('Discussion')private discussionModel: Model<Discussion>,
  ) {}

  create(createDiscussionDto: CreateDiscussionDto) {
    const createdDiscussion = new this.discussionModel(createDiscussionDto);
    return createdDiscussion.save();
  }

  findAll() {
    return this.discussionModel.find().exec();
  }

  findOne(id: string) {
    return this.discussionModel.findById(id).exec();
  }

  update(id: string, updateDiscussionDto: UpdateDiscussionDto) {
    return this.discussionModel.findByIdAndUpdate(id, updateDiscussionDto).exec();
  }

  remove(id: string) {
    return this.discussionModel.findByIdAndDelete(id).exec();
  }
}
