/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { AuthenticatedRequest } from 'utils/types';

@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  create(
    @Body() createNoteDto: CreateNoteDto,
    @Req() req:AuthenticatedRequest
  ) {
    return this.noteService.create(createNoteDto,req.user._id);
  }

  @Get()
  findAll(
    @Req() req:AuthenticatedRequest,
    @Query("page") page?:number
  ) {
    return this.noteService.findAll(req.user._id,page);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req:AuthenticatedRequest) {
    return this.noteService.findOne(id,req.user._id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto, @Req() req:AuthenticatedRequest) {
    return this.noteService.update(id, updateNoteDto,req.user._id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req:AuthenticatedRequest) {
    return this.noteService.remove(id,req.user._id);
  }
}
