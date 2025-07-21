/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {Schema as MongooseSchema} from "mongoose"
@Schema({timestamps:true})
export class Notification {
    @Prop({type: MongooseSchema.Types.ObjectId, required: true})
    _id: MongooseSchema.Types.ObjectId;
    @Prop({type: String, required: true})
    content:string
}
export const NotificationSchema = SchemaFactory.createForClass(Notification);