/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Req, Query } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { IsObjectIdPipe } from '@nestjs/mongoose';
import { AuthenticatedRequest, ProcessName } from 'utils/types';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import { UserService } from 'src/user/user.service';

@Controller('team')
export class TeamController {
  constructor(
    private readonly teamService: TeamService,
    private readonly userService: UserService,
    @InjectQueue(ProcessName.TEAM) private readonly jobQueue:Queue,
  ) {}

  @Post()
  create(
    @Body(ValidationPipe) createTeamDto: CreateTeamDto,
    @Req() req:AuthenticatedRequest
  ) {
    return this.teamService.create(createTeamDto,req.user._id);
  }

  @Get()
  async findAll(
    @Req() req:AuthenticatedRequest,
    @Query("page") page?:number,
    @Query("search") search?:string,
  ) {
    return await this.teamService.findAll(req.user._id,page,search);
  }
  @Post("toggle-add-user/:id/:creator")
  public async addOrRemoveUser(
    @Req() req:AuthenticatedRequest,
    @Param("id",IsObjectIdPipe) id:string,
    @Param("creator",IsObjectIdPipe) creator:string,
  ){
    const [team,user] = await Promise.all([
      this.teamService.findOne(id,req.user._id),
      this.userService.findUserByEmail(req.user.email)
    ])
    if(!team){
      throw new Error("Team not found");
    }
    if(!user){
      throw new Error("User not found");
    }
    if(team.isAdmin){
      const result = await this.teamService.addOrRemoveUser(id,creator);
      if(result.isAdded){
        await this.jobQueue.add("add-member",{
          teamName:team.team.name,
          firstName:user.firstName,
          lastName:user.lastName,
          email:user.email,
        })
      }else{
        await this.jobQueue.add("remove-member",{
          teamName:team.team.name,
          firstName:user.firstName,
          lastName:user.lastName,
          email:user.email
        })
      }
      return result;
    }
    throw new Error("You are not authorized to add or remove users");
  }
  @Get(':id')
  async findOne(
    @Param('id',IsObjectIdPipe) id: string,
    @Req() req:AuthenticatedRequest,
  ) {
    return this.teamService.findOne(id,req.user._id);
  }

  @Patch(':id')
  async update(
    @Param('id',IsObjectIdPipe) id: string,
    @Req() req:AuthenticatedRequest, 
    @Body(ValidationPipe) updateTeamDto: UpdateTeamDto
  ) {
    return this.teamService.update(id,req.user._id, updateTeamDto);
  }

  @Delete(':id')
  async remove(
    @Param('id',IsObjectIdPipe) id: string,
    @Req() req:AuthenticatedRequest
  ) {
    return this.teamService.remove(id,req.user._id);
  }
}
