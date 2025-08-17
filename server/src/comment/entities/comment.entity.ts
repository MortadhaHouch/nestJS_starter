/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {Schema as MongooseSchema} from "mongoose"
@Schema({timestamps:true})
export class Comment {
    _id: MongooseSchema.Types.ObjectId;
    @Prop({required:true,type:MongooseSchema.Types.ObjectId,ref:"Blog"})
    blogId: MongooseSchema.Types.ObjectId;
    @Prop({required:true,type:String})
    content: string;
    @Prop({required:true,type:MongooseSchema.Types.ObjectId,ref:"User"})
    creatorId: MongooseSchema.Types.ObjectId;
}
export const CommentSchema = SchemaFactory.createForClass(Comment);