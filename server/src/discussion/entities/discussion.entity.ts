/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {Schema as MongooseSchema} from "mongoose"
@Schema({timestamps: true})
export class Discussion {
    @Prop({type:MongooseSchema.Types.ObjectId,ref:"User",required:true})
    members:MongooseSchema.Types.ObjectId[]
    @Prop({type:MongooseSchema.Types.ObjectId,ref:"Message",required:true})
    messages:MongooseSchema.Types.ObjectId[]
}
export const DiscussionSchema = SchemaFactory.createForClass(Discussion);
