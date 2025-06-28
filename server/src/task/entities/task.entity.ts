/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { TaskStatus } from "utils/types";

@Schema({timestamps: true})
export class Task {
    @Prop({required: true})
    title: string;

    @Prop({required: true})
    description: string;

    @Prop({required: true,enum: Object.keys(TaskStatus).map(k => k.toString()),default:TaskStatus.PENDING,type: String})
    status: TaskStatus;
    @Prop({default:new Date(new Date().setDate(new Date().getDate() + 1)),required:false})
    overdue:Date;
}
export const TaskSchema = SchemaFactory.createForClass(Task);