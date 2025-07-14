/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { WorkspaceController } from './workspace.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Workspace, WorkspaceSchema } from './entities/workspace.entity';

@Module({
  controllers: [WorkspaceController],
  providers: [WorkspaceService],
  imports:[
    MongooseModule.forFeature([
      { name: Workspace.name, schema: WorkspaceSchema },
    ]),
  ],
  exports:[WorkspaceService]
})
export class WorkspaceModule {}
