/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Req, Query } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { AuthenticatedRequest, WorkSpaceStatus } from 'utils/types';

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
  findOne(@Param('id') id: string) {
    return this.workspaceService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkspaceDto: UpdateWorkspaceDto) {
    return this.workspaceService.update(id, updateWorkspaceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workspaceService.remove(id);
  }
}
