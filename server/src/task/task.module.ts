/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './entities/task.entity';
import { UserModule } from '../user/user.module';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Task.name, schema: TaskSchema },
    ]),
    forwardRef(() => UserModule),
  ],
  controllers: [TaskController],
  providers: [TaskService],
  exports:[TaskService]
})
export class TaskModule {}
