/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {Schema as MongooseSchema} from "mongoose"
@Schema({timestamps: true})
export class Team {
    _id: MongooseSchema.Types.ObjectId;
    @Prop({type:MongooseSchema.Types.ObjectId,ref:"User",required:true})
    creator:MongooseSchema.Types.ObjectId;
    @Prop({type:String,required:true})
    name:string;
    @Prop({type:String,required:true})
    description:string;
    @Prop({type:[{type:MongooseSchema.Types.ObjectId,ref:"Workspace"}],required:true})
    workspaces:MongooseSchema.Types.ObjectId[];
    @Prop({type:[{type:MongooseSchema.Types.ObjectId,ref:"User"}],required:true})
    members:MongooseSchema.Types.ObjectId[]
    @Prop({type:[{type:MongooseSchema.Types.ObjectId,ref:"Discussion"}],required:true})
    discussions:MongooseSchema.Types.ObjectId[]
}
export const TeamSchema = SchemaFactory.createForClass(Team);