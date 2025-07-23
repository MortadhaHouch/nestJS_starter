/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogSchema } from './entities/blog.entity';

@Module({
  controllers: [BlogController],
  providers: [BlogService],
  imports:[
    MongooseModule.forFeature([
      {
        name:'Blog',
        schema:BlogSchema
      }
    ])
  ]
})
export class BlogModule {}
