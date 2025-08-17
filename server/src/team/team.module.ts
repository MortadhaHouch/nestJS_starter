/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamSchema } from './entities/team.entity';
import { ProcessName } from 'utils/types';
import { BullModule } from '@nestjs/bullmq';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [TeamController],
  providers: [
    TeamService
  ],
  imports:[
    MongooseModule.forFeature([
      { name: 'Team', schema: TeamSchema }
    ]),
    BullModule.registerQueue({
      name: ProcessName.TEAM,
    }),
    forwardRef(()=>UserModule)
  ],
  exports:[TeamService]
})
export class TeamModule {}
