/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Schema as MongooseSchema} from "mongoose"
import { ProfileAccessLevel } from 'utils/types';
@Schema({timestamps:true})
export class User {
  _id: MongooseSchema.Types.ObjectId;
  @Prop({
    required: true,
    minlength: 3,
    message: 'First name must be at least 3 characters long',
  })
  firstName: string;
  @Prop({
    required: true,
    minlength: 3,
    message: 'Last name must be at least 3 characters long',
  })
  lastName: string;
  @Prop({
    unique: true,
    required: true,
    minlength: 8,
    message: 'Email must be at least 8 characters long',
  })
  email: string;
  @Prop({
    minlength: 8,
    required: true,
    message: 'Password must be at least 8 characters long',
  })
  password: string;
  @Prop({
    required: true,
    enum: ['USER', 'ADMIN', 'SUPER_ADMIN'],
    default: 'USER',
  })
  role: string;
  @Prop({type:[{type:MongooseSchema.Types.ObjectId,ref:"Task"}]})
  tasks: MongooseSchema.Types.ObjectId[];
  @Prop({type:Boolean,default:false})
  isLoggedIn:boolean;
  @Prop({type:Number,default:0,required:false})
  validationCode:number;
  @Prop({type:Date,required:false})
  latestLoginTrial: Date;
  @Prop({type:Number,required:false})
  otpTrialCount:number;
  @Prop({type:Date,required:false})
  firstOPTTrial:Date;
  @Prop({type:String,required:false})
  ip:string;
  @Prop({type:[{type:MongooseSchema.Types.ObjectId,ref:"User"}],default:[]})
  friends:MongooseSchema.Types.ObjectId[]
  @Prop({type:[{type:MongooseSchema.Types.ObjectId,ref:"Note"}],default:[],required:false})
  notes:MongooseSchema.Types.ObjectId[]
  @Prop({type:[{type:MongooseSchema.Types.ObjectId,ref:"Discussion"}],default:[],required:false})
  discussions:MongooseSchema.Types.ObjectId[]
  @Prop({type:[{type:MongooseSchema.Types.ObjectId,ref:"Notification"}],default:[],required:false})
  notifications:MongooseSchema.Types.ObjectId[]
  @Prop({type:String,default:ProfileAccessLevel.PUBLIC,required:false})
  accessLevel:ProfileAccessLevel;
  @Prop({
    type: [
      {
        user: {
          type: MongooseSchema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        date: {
          type: Date,
          required: true,
        },
      },
    ],
    default: [],
    required: false,
  })
  views:[{user:MongooseSchema.Types.ObjectId,date:Date}]
  @Prop({type:[String],required:false,default:[]})
  socialMediaLinks:string[]
  @Prop({type:String,required:false})
  website:string
  @Prop({type:Date,required:false})
  birthDate:Date
  @Prop({type:Number,required:false})
  phoneNumber:number
}
export const UserSchema = SchemaFactory.createForClass(User);