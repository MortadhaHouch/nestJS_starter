/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Req, Query, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { AuthenticatedRequest, WorkSpaceStatus } from 'utils/types';
import { IsObjectIdPipe } from '@nestjs/mongoose';
import { AddUsersDto } from './dto/add-users.dto';

@Controller('workspace')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Post()
  create(@Req() req:AuthenticatedRequest, @Body(ValidationPipe) createWorkspaceDto: CreateWorkspaceDto) {
    return this.workspaceService.create(createWorkspaceDto,(req.user as any)._id as string);
  }

  @Get()
  findAll(
    @Req() req:AuthenticatedRequest,
    @Query("page") page?: string,
    @Query("limit") limit?: string,
    @Query("search") search?: string,
    @Query("sort") sort?: 'asc' | 'desc',
    @Query("sortParams") sortParams?: string,
    @Query("status") status?: WorkSpaceStatus
  ) {
    return this.workspaceService.findAll(
      (req.user as any)._id as string,
      page ? parseInt(page) : 1,
      limit ? parseInt(limit) : 10,
      search,
      sort,
      sortParams,
      status
    );
  }

  @Get(':id')
  async findOne(
    @Req() req:AuthenticatedRequest,
    @Param('id',IsObjectIdPipe) id: string
  ) {
    return await this.workspaceService.findAccessible(id,req.user._id);
  }

  @Patch(':id')
  async update(
    @Param('id',IsObjectIdPipe) id: string,
    @Body(ValidationPipe) updateWorkspaceDto: UpdateWorkspaceDto,
    @Req() req:AuthenticatedRequest
  ) {
    const foundWorkspace = await this.workspaceService.findMyWorkspace(id,req.user._id);
    if(!foundWorkspace) return new NotFoundException({
      error:"workspace not found"
    });
    return this.workspaceService.update(id, updateWorkspaceDto);
  }
  @Patch('join/:id')
  async joinWorkspace(
    @Param('id',IsObjectIdPipe) id: string,
    @Req() req:AuthenticatedRequest,
    @Body(ValidationPipe) userIds:AddUsersDto
  ){
    const foundWorkspace = await this.workspaceService.findMyWorkspace(id,req.user._id);
    if(!foundWorkspace) return new NotFoundException({
      error:"workspace not found"
    });
    return this.workspaceService.addUsers(id,userIds.ids);
  }
  @Delete(':id')
  async remove(
    @Param('id',IsObjectIdPipe) id: string,
    @Req() req:AuthenticatedRequest
  ) {
    const foundWorkspace = await this.workspaceService.findMyWorkspace(id,req.user._id);
    if(foundWorkspace){
      return this.workspaceService.remove(id);
    }
    return new UnauthorizedException({error:"unauthorized"});
  }
}
