/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {Schema as MongooseSchema} from "mongoose"
import { NotificationType } from "utils/types";
@Schema({timestamps:true})
export class Notification {
    @Prop({type: MongooseSchema.Types.ObjectId, required: true})
    _id: MongooseSchema.Types.ObjectId;
    @Prop({type: String, required: true})
    content:string
    @Prop({type: String,enum:Object.keys(NotificationType).map(k => k.toString()),required:false,default:NotificationType.ALL})
    type?:NotificationType
}
export const NotificationSchema = SchemaFactory.createForClass(Notification);