/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Team } from './entities/team.entity';

@Injectable()
export class TeamService {
  private readonly teamFields = {
    name:1,
    description:1,
    status:1,
    creator:1,
    members:1,
    createdAt:1,
    updatedAt:1,
    workspaces:1,
    discussions:1
  }
  constructor(
    @InjectModel("Team") private readonly teamModel:Model<Team>
  ){
    
  }
  async addOrRemoveUser(id: string, creator: string) {
    const foundTeam = await this.teamModel.findOne(
      {
        _id:id,
        members:{
          $in:[creator]
        }
      }
    )
    if(foundTeam){
      const updateResult = await this.teamModel.updateOne(
        {
          _id:id,
          members:{
            $in:[creator]
          }
        },
        {
          $pull:{
            members:creator
          }
        }
      )
      return {
        team:updateResult,
        isAdded:false
      }
    }
    const updateResult = await this.teamModel.updateOne(
      {
        _id:id,
        members:{
          $in:[creator]
        }
      },
      {
        $addToSet:{
          members:creator
        }
      }
    )
    return {
      team:updateResult,
      isAdded:true
    }
  }
  async create(createTeamDto: CreateTeamDto,creator:ObjectId) {
    const createdTeam = await this.teamModel.create({...createTeamDto,creator});
    return createdTeam;
  }

  async findAll(
    creator:ObjectId,
    page?:number,
    search?:string
  ) {
    if(page){
      const teams = await this.teamModel
      .find({creator,name:{$regex:search??"",$options:"i"}})
      .populate("creator","firstName lastName email _id")
      .populate("members","firstName lastName email _id")
      .skip(page ? (page-1)*10 : 0)
      .limit(10)
      return {
        teams,
        count:teams.length,
        page:isNaN(Number(page))?1:Number(page)
      };
    }
    const teams = await this.teamModel
    .find({creator,name:{$regex:search??"",$options:"i"}})
    .populate("creator","firstName lastName email _id")
    .populate("members","firstName lastName email _id")
    return teams;
  }

  async findOne(id: string,creator:ObjectId) {
    const foundTeam = await this.teamModel.findOne({
      _id:id,
      creator
    })
    .populate("creator","firstName lastName email _id")
    .populate("members","firstName lastName email _id");
    if(foundTeam){
      return {
        team:foundTeam,
        isAdmin:true
      }
    }
    const foundMember = await this.teamModel.findOne({
      _id:id,
      members:creator
    })
    .populate("creator","firstName lastName email _id")
    .populate("members","firstName lastName email _id");
    if(foundMember){
      return {
        team:foundMember,
        isAdmin:false
      }
    }
    return null
  }

  async update(id: string, creator:ObjectId, updateTeamDto: UpdateTeamDto) {
    const updatedTeam = await this.teamModel.findOneAndUpdate({
      _id:id,
      creator
    },updateTeamDto,{new:true});
    return updatedTeam;
  }

  async remove(id: string,creator:ObjectId) {
    const deletedTeam = await this.teamModel.findOneAndDelete({
      _id:id,
      creator
    });
    return deletedTeam;
  }
}
