/* eslint-disable prettier/prettier */
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { WorkSpaceStatus } from 'utils/types';

@Schema({ timestamps: true })
export class Workspace {
    @Prop({ required: true ,type:String})
    title:string;
    @Prop({ required: true ,type:String})
    description:string;
    @Prop({ required: true ,type:MongooseSchema.Types.ObjectId,ref:"User"})
    creator:MongooseSchema.Types.ObjectId;
    @Prop({ required: false ,type:[{type:MongooseSchema.Types.ObjectId,ref:"User"}],default:[]})
    members:MongooseSchema.Types.ObjectId[];
    @Prop({ required: false ,type:[{type:MongooseSchema.Types.ObjectId,ref:"User"}],default:[]})
    tasks:MongooseSchema.Types.ObjectId[];
    @Prop({required:false,default:"ACTIVE",enum: Object.keys(WorkSpaceStatus).map(k => k.toString()),type: String})
    status: WorkSpaceStatus
    @Prop({required:false,type:[String]})
    tags:string[]
}
export const WorkspaceSchema = SchemaFactory.createForClass(Workspace); 