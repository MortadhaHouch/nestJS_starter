/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema } from './entities/comment.entity';
import { forwardRef } from '@nestjs/common';
import { BlogModule } from 'src/blog/blog.module';
@Module({
  controllers: [CommentController],
  providers: [CommentService],
  imports:[MongooseModule.forFeature([
    {name:"Comment",schema:CommentSchema},
  ]),
  forwardRef(()=>BlogModule)],
  exports:[CommentService]
})
export class CommentModule {}
