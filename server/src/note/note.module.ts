/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { NoteSchema } from './entities/note.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [NoteController],
  providers: [NoteService],
  imports:[
    MongooseModule.forFeature([{ name: 'Note', schema: NoteSchema }])
  ],
  exports:[NoteService]
})
export class NoteModule {}
