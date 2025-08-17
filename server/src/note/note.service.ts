/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Model, ObjectId } from 'mongoose';
import { Note } from './entities/note.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class NoteService {
  constructor(@InjectModel('Note') private noteModel: Model<Note>) {}

  create(createNoteDto: CreateNoteDto,userId:ObjectId) {
    return this.noteModel.create({...createNoteDto,creator:userId});
  }

  async findAll(userId:ObjectId,page?:number) {
    if(page){
      const [notes,count] = await Promise.all([
        this.noteModel.find({creator:userId}).populate("creator","firstName lastName email _id").skip((page-1)*10).limit(10),
        this.noteModel.countDocuments({creator:userId})
      ])
      return {
        notes,
        count,
        page:Number(page)
      }
    }
    return this.noteModel.find({creator:userId}).populate("creator","firstName lastName email _id")
  }

  findOne(id: string,userId:ObjectId) {
    return this.noteModel.findOne({creator:userId,_id:id}).populate("creator","firstName lastName email _id")
  }

  update(id: string, updateNoteDto: UpdateNoteDto,userId:ObjectId) {
    return this.noteModel.findOneAndUpdate({creator:userId,_id:id}, updateNoteDto).populate("creator","firstName lastName email _id")
  }

  remove(id: string,userId:ObjectId) {
    return this.noteModel.findOneAndDelete({creator:userId,_id:id}).populate("creator","firstName lastName email _id")
  }
}
