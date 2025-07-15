/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {Schema as MongooseSchema} from "mongoose"
import { RequestStatus } from "utils/types";
@Schema({timestamps: true})
export class FriendRequest{
    @Prop({type: MongooseSchema.Types.ObjectId, ref: "User", required: true})
    sender: MongooseSchema.Types.ObjectId;
    @Prop({type: MongooseSchema.Types.ObjectId, ref: "User", required: true})
    receiver: MongooseSchema.Types.ObjectId;
    @Prop({enum: Object.keys(RequestStatus).map(k => k.toString()),default:RequestStatus.PENDING.toString(),type: String})
    status: RequestStatus;
}
export const FriendRequestSchema = SchemaFactory.createForClass(FriendRequest);