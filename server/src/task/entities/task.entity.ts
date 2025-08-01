/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { CheckItem, TaskPriority, TaskStatus } from "utils/types";
import { Schema as MongooseSchema } from "mongoose";

@Schema({timestamps: true})
export class Task {
    _id:MongooseSchema.Types.ObjectId;
    @Prop({required: true})
    title: string;

    @Prop({required: true})
    description: string;

    @Prop({required: true,enum: Object.keys(TaskStatus).map(k => k.toString()),default:TaskStatus.PENDING,type: String})
    status: TaskStatus;
    @Prop({default:new Date(new Date().setDate(new Date().getDate() + 1)),required:false})
    overdue:Date;
    
    @Prop({type: MongooseSchema.Types.ObjectId, ref: "User", required: true})
    userId: MongooseSchema.Types.ObjectId;
    @Prop({tags:[String],required:false})
    tags:string[]
    @Prop({default: TaskPriority.MEDIUM, enum: Object.keys(TaskPriority).map(k => k.toString()), type: String, required: true})
    priority: TaskPriority;
    @Prop({required:false,default:[],type:[{type:MongooseSchema.Types.ObjectId,ref:"User"}]})
    assignees:MongooseSchema.Types.ObjectId[]
    @Prop({type: [String],default: [],required:false})
    comments:string[]
    @Prop({type:[String],required:false,default:[]})
    attachments:string[]
    @Prop({type:[{name:String,checked:Boolean}],required:false,default:[]})
    checklist:CheckItem[]
    @Prop({type:String,required:false})
    color:string
    @Prop({type:String,required:false})
    notes:string
}
export const TaskSchema = SchemaFactory.createForClass(Task);