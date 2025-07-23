/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Req, NotFoundException, Query } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { AuthenticatedRequest } from 'utils/types';
import { IsObjectIdPipe } from '@nestjs/mongoose';

@Controller('blog')
export class BlogController {
  constructor(
    private readonly blogService: BlogService,
  ) {}

  @Post()
  async create(
    @Body(ValidationPipe) createBlogDto: CreateBlogDto,
    @Req() req:AuthenticatedRequest
  ) {
    const createdBlog = await this.blogService.create(req.user._id, createBlogDto);
    createdBlog.creator = req.user._id
    await createdBlog.save();
    return createdBlog;
  }

  @Get()
  findAll(@Query('tags') tags?:string,@Query('p') p?:number) {
    return this.blogService.findAll(p,tags);
  }

  @Get(':id')
  async findOne(
      @Param('id',IsObjectIdPipe) id: string,
      @Query('tags') tags?:string,
      @Query('page') page?:number
    ) {
    return await this.blogService.findOne(id,tags,page);
  }

  @Patch(':id')
  update(
    @Param('id',IsObjectIdPipe) id: string,
    @Body(ValidationPipe) updateBlogDto: UpdateBlogDto
  ) {
    return this.blogService.update(id, updateBlogDto);
  }

  @Delete(':id')
  async remove(@Param('id',IsObjectIdPipe) id: string) {
    const removed = await this.blogService.remove(id);
    if(removed){
      return removed
    }
    return new NotFoundException({notFound:"blog not found"});
  }
}
