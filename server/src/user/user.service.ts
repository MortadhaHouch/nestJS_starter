/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel:Model<User>) {
  }
  public create(user:CreateUserDto){
    return this.userModel.create(user);
  }
  public findUserByEmail(email:string){
    return this.userModel.findOne({email});
  }
  public async hashPassword(password:string,salt?:number){
    return await bcrypt.hash(password,salt || 10);
  }
  public async checkPassword(password:string,hash:string){
    return await bcrypt.compare(password,hash);
  }
}
