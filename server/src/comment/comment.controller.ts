/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Req } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { IsObjectIdPipe } from '@nestjs/mongoose';
import { AuthenticatedRequest } from 'utils/types';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post(":id")
  async create(
    @Param('id',IsObjectIdPipe) id: string,
    @Body(ValidationPipe) createCommentDto: CreateCommentDto,
    @Req() req:AuthenticatedRequest
  ) {
    const createdComment = await this.commentService.create(id,req.user._id,createCommentDto);
    return {
      comment:createdComment,
      ok:true,
      creator:{
        firstName:req.user.firstName,
        lastName:req.user.lastName,
        email:req.user.email,
        _id:req.user._id
      }
    }
  }

  @Get(":id")
  async findAll(@Param('id',IsObjectIdPipe) id: string) {
    const comments = await this.commentService.findAll(id);
    return {
      comments,
      ok:true
    }
  }

  @Patch(':id')
  async update(
    @Param('id',IsObjectIdPipe) id: string, 
    @Body(ValidationPipe) updateCommentDto: UpdateCommentDto,
    @Req() req:AuthenticatedRequest
  ) {
    const updatedComment = await this.commentService.update(id, updateCommentDto);
    return {
      comment:updatedComment,
      ok:true,
      creator:{
        firstName:req.user.firstName,
        lastName:req.user.lastName,
        email:req.user.email,
        _id:req.user._id
      }
    }
  }

  @Delete(':id')
  remove(@Param('id',IsObjectIdPipe) id: string) {
    return this.commentService.remove(id);
  }
}
