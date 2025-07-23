/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Model, ObjectId } from 'mongoose';
import { Blog } from './entities/blog.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel('Blog') private readonly blogModel:Model<Blog>
  ){

  }
  create(userId: ObjectId,createBlogDto: CreateBlogDto) {
    return this.blogModel.create({...createBlogDto,creator:userId});
  }

  async findAll(p?:number,tags?:string) {
    const query = {};
    let foundBlogs;
    if(tags){
      query["tags"] = {$all:tags.split(",")};
    }
    if(p){
      foundBlogs = await this.blogModel.find(query).skip(p*10).limit(10).populate("creator","firstName lastName email");
    }
    else{
      foundBlogs = await this.blogModel.find(query).populate("creator","firstName lastName email");
    }
    return {
      results:foundBlogs,
      count:foundBlogs.length,
      p
    }
  }
  async getStats(createdAt?:string,dateRange?:{from:Date,to:Date}) {
    if(createdAt){
      const blogsGroupedByDate = await this.blogModel.aggregate([
        { $match: { createdAt: { $gte: createdAt } } },
        { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, count: { $sum: 1 } } },
      ]);
      return {
        results:blogsGroupedByDate,
        count:blogsGroupedByDate.length
      }
    }
    if(dateRange){
      const blogsGroupedByDate = await this.blogModel.aggregate([
        { $match: { createdAt: { $gte: dateRange.from, $lte: dateRange.to } } },
        { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, count: { $sum: 1 } } },
      ]);
      return {
        results:blogsGroupedByDate,
        count:blogsGroupedByDate.length
      }
    }
  }
  async findOne(id: string,tags?:string,p?:number) {
    const results = {};
    const foundBlog = await this.blogModel.findById(id).populate("creator","firstName lastName email _id");
    results["blog"] = foundBlog;
    if(tags){
      const similarBlogs = await this.blogModel.find({
        _id:{$ne:id},
        tags:{$all:tags.split(",")}
      }).populate("creator","firstName lastName email _id").skip(p?p*10:0).limit(10);
      results["similarBlogs"] = similarBlogs;
      results["count"] = similarBlogs.length;
      results["p"] = p?p:0;
    }
    return results;
  }

  async update(id: string, updateBlogDto: UpdateBlogDto) {
    const foundBlog = await this.blogModel.findById(id);
    if(foundBlog){
      return this.blogModel.findByIdAndUpdate(id,updateBlogDto,{
        runValidators:true,
        new:true
      });
    }
    return new NotFoundException({notFound:"blog not found"});
  }

  async remove(id: string) {
    return this.blogModel.findByIdAndDelete(id);
  }
}
