/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {Schema as MongooseSchema} from "mongoose"
@Schema({ timestamps: true })
export class Blog {
    _id:MongooseSchema.Types.ObjectId;
    @Prop({type: String, required: true})
    title: string;
    @Prop({type: String, required: true})
    content: string;
    @Prop({type: MongooseSchema.Types.ObjectId, required: true,ref:"User"})
    creator: MongooseSchema.Types.ObjectId;
    @Prop({type:[String],required:false,default:[]})
    tags:string[]
    @Prop({type:[{type:MongooseSchema.Types.ObjectId,ref:"Comment"}],required:false,default:[]})
    comments:MongooseSchema.Types.ObjectId[]
    @Prop({type:[{type:MongooseSchema.Types.ObjectId,ref:"User"}],required:false,default:[]})
    likers:MongooseSchema.Types.ObjectId[]
    @Prop({type:[{type:MongooseSchema.Types.ObjectId,ref:"User"}],required:false,default:[]})
    dislikers:MongooseSchema.Types.ObjectId[]
    @Prop({type:Number,required:false,default:0})
    views:number;
    @Prop({type:[{type:MongooseSchema.Types.ObjectId,ref:"User"}],required:false,default:[]})
    bookmarks:MongooseSchema.Types.ObjectId[]
    @Prop({type:Boolean,required:false,default:false})
    isPinned:boolean
}   
export const BlogSchema = SchemaFactory.createForClass(Blog);