/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Model, ObjectId } from 'mongoose';
import { Comment } from './entities/comment.entity';
import { InjectModel } from '@nestjs/mongoose';
import { BlogService } from 'src/blog/blog.service';

@Injectable()
export class CommentService {
  private readonly commentFields = {
    content:1,
    creatorId:1,
    blogId:1,
    createdAt:1,
    updatedAt:1,
    __v:1
  }
  constructor(
    @InjectModel("Comment") private readonly commentModel:Model<Comment>,
    private readonly blogService:BlogService
  ){
    
  }
  async create(blogId:string,creatorId:ObjectId,createCommentDto: CreateCommentDto) {
    const blog = await this.blogService.findOne(blogId);
    if(!blog){
      throw new Error("Blog not found");
    }
    return this.commentModel.create({...createCommentDto,blogId,creatorId});
  }

  async findAll(id: string) {
    return await this.commentModel.find({blogId:id}).populate("creatorId","firstName lastName email _id");
  }
  async findMyComments(creator:ObjectId){
    return await this.commentModel.find({creatorId:creator}).populate("creatorId","firstName lastName email _id").select(this.commentFields);
  }
  async findOne(id: string) {
    return await this.commentModel.findById(id).populate("creatorId","firstName lastName email _id");
  }

  update(id: string, updateCommentDto: UpdateCommentDto) {
    return this.commentModel.findByIdAndUpdate(id,updateCommentDto,{
      runValidators:true,
      new:true
    }).populate("creatorId","firstName lastName email _id");
  }

  remove(id: string) {
    return this.commentModel.findByIdAndDelete(id).populate("creatorId","firstName lastName email _id");
  }
}
