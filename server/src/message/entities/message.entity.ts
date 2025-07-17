/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Schema as MongooseSchema } from "mongoose";
@Schema({timestamps: true})
export class Message {
    @Prop({type: MongooseSchema.Types.ObjectId, required: true})
    _id: MongooseSchema.Types.ObjectId;
    @Prop({type: MongooseSchema.Types.ObjectId, required: true})
    sender: MongooseSchema.Types.ObjectId;
    @Prop({type: MongooseSchema.Types.ObjectId, required: true})
    receiver: MongooseSchema.Types.ObjectId;
    @Prop({required: true,type: String})
    message: string;
}
export const MessageSchema = SchemaFactory.createForClass(Message);
