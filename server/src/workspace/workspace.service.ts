/* eslint-disable prettier/prettier */
import { Body, Injectable } from '@nestjs/common';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Workspace } from './entities/workspace.entity';
import { Model, ObjectId } from 'mongoose';

@Injectable()
export class WorkspaceService {
  private readonly workspaceFields = {
    name:1,
    description:1,
    status:1,
    creator:1,
    members:1,
    createdAt:1,
    updatedAt:1,
  }
  constructor(
    @InjectModel(Workspace.name) private readonly workspaceModel:Model<Workspace>,
  ){

  }
  create(createWorkspaceDto: CreateWorkspaceDto,id:ObjectId) {
    return this.workspaceModel.create({...createWorkspaceDto,creator:id});
  }

  findAll(
    id:ObjectId,
  ) {
    return this.workspaceModel.find({
      $or:[
        {creator:id},
        {members:{
          $in:[id]
        }},
      ]
    }).select(this.workspaceFields).populate("creator","firstName lastName email _id").populate("members","firstName lastName email _id");
  }

  findOne(id: string) {
    return this.workspaceModel.findById(id);
  }

  update(id: string,updateWorkspaceDto: UpdateWorkspaceDto) {
    return this.workspaceModel.updateOne(
      { _id: id },
      { $set: updateWorkspaceDto }
    );
  }
  findAccessible(id:string,creator:ObjectId){
    return this.workspaceModel.findOne({
      _id:id,
      $or:[
        {creator:creator},
        {members:{
          $in:[creator]
        }},
      ]
    })
  }
  findMyWorkspace(id:string,creatorId:ObjectId){
    return this.workspaceModel.findOne({
      _id:id,
      creator:creatorId
    })
  }
  remove(id: string) {
    return this.workspaceModel.deleteOne({_id:id});
  }
  addUsers(id:string,userIds:string[]){
    return this.workspaceModel.updateOne({_id:id},{members:{$addToSet:userIds}});
  }
}
