/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DiscussionService } from './discussion.service';
import { DiscussionController } from './discussion.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DiscussionSchema } from './entities/discussion.entity';

@Module({
  controllers: [DiscussionController],
  providers: [DiscussionService],
  imports: [
    MongooseModule.forFeature([
      { name: 'Discussion', schema: DiscussionSchema },
    ]),
  ],
})
export class DiscussionModule {}
