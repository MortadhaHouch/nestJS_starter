/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {Schema as MongooseSchema} from "mongoose"
@Schema({timestamps: true})
export class Note {
    _id: MongooseSchema.Types.ObjectId
    @Prop({type: String, required: true})
    title: string
    @Prop({type: String, required: true})
    content: string
    @Prop({type: MongooseSchema.Types.ObjectId, required: true,ref:"User"})
    creator: MongooseSchema.Types.ObjectId
}
export const NoteSchema = SchemaFactory.createForClass(Note);
