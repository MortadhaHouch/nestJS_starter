/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamSchema } from './entities/team.entity';

@Module({
  controllers: [TeamController],
  providers: [TeamService],
  imports:[
    MongooseModule.forFeature([{ name: 'Team', schema: TeamSchema }])
  ]
})
export class TeamModule {}
