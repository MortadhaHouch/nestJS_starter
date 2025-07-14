/* eslint-disable prettier/prettier */
import { Body, Injectable, Param, ValidationPipe } from '@nestjs/common';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { InjectModel, IsObjectIdPipe } from '@nestjs/mongoose';
import { Workspace } from './entities/workspace.entity';
import { Model } from 'mongoose';
import { WorkSpaceStatus } from 'utils/types';

@Injectable()
export class WorkspaceService {
  constructor(
    @InjectModel(Workspace.name) private readonly workspaceModel:Model<Workspace>,
  ){

  }
  create(createWorkspaceDto: CreateWorkspaceDto,id:string) {
    return this.workspaceModel.create({...createWorkspaceDto,creator:id});
  }

  findAll(
    id:string,
    p?:number,
    limit?:number,
    search?:string,
    sortOrder?:'asc' | 'desc',
    sortParams?:string,
    status?:WorkSpaceStatus
  ) {
    const searchConfig = {
      $or: [
        { title: { $regex: search || "", $options: 'i' } },
        { description: { $regex: search || "", $options: 'i' } },
        { status:status || WorkSpaceStatus.ACTIVE },
      ],
    };
    return this.workspaceModel.find({
      creator:id,
      ...searchConfig,
      ...sortParams?{$sort:{[sortParams]:(sortOrder === 'asc')?1:-1}}:{},
    }).skip(p?(p-1)*(limit||10):0).limit(limit||10);
  }

  findOne(@Param('id',IsObjectIdPipe) id: string) {
    return this.workspaceModel.findById(id);
  }

  update(@Param('id',IsObjectIdPipe) id: string,@Body(ValidationPipe) updateWorkspaceDto: UpdateWorkspaceDto) {
    return this.workspaceModel.findByIdAndUpdate(id,updateWorkspaceDto,{
      new:true,
      runValidators:true,
    });
  }

  remove(@Param('id',IsObjectIdPipe) id: string) {
    return this.workspaceModel.findByIdAndDelete(id);
  }
}
