/* eslint-disable prettier/prettier */
import { BlogService } from './../blog/blog.service';
import { TeamService } from './../team/team.service';
import { TaskService } from './../task/task.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Model, ObjectId, Schema } from 'mongoose';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { WorkspaceService } from 'src/workspace/workspace.service';
import { CommentService } from 'src/comment/comment.service';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class UserService {
  public async getFriends(_id: Schema.Types.ObjectId) {
    return this.userModel.findById(_id).select(this.userFields).populate("friends","firstName lastName email _id phoneNumber birthDate ").select({...this.userFields,friends:1});
  }
  private readonly userFields = {
    firstName:1,
    lastName:1,
    email:1,
    _id:1,
    accessLevel:1,
    friends:1,
    views:1,
    latestLoginTrial:1,
    createdAt:1,
    updatedAt:1,
    socialMediaLinks:1,
    website:1,
    birthDate:1,
    phoneNumber:1,
    isLoggedIn:1
  }
  constructor(
    @InjectModel("User") private readonly userModel:Model<User>,
    private readonly taskService:TaskService,
    private readonly workspaceService:WorkspaceService,
    private readonly teamService:TeamService,
    private readonly blogService:BlogService,
    private readonly commentService:CommentService
  ) {
  }
  public async getMyProfile(id:ObjectId){
    return this.userModel.findById(id).select(this.userFields);
  }
  public async getUserProfile(id:ObjectId){
    const userSearchTask = this.userModel.findById(id).select(this.userFields).populate("friends","firstName lastName email _id").populate("views","firstName lastName email _id");
    const tasksSearchTask = this.taskService.findAll(id);
    const workspacesSearchTask = this.workspaceService.findAll(id)
    const teamsSearchTask = this.teamService.findAll(id)
    const blogsSearchTask = this.blogService.findMyBlogs(id)
    const commentsSearchTask = this.commentService.findMyComments(id)
    const [user,tasks,workspaces,teams,blogs,comments] = await Promise.all([
      userSearchTask,
      tasksSearchTask,
      workspacesSearchTask,
      teamsSearchTask,
      blogsSearchTask,
      commentsSearchTask
    ]);
    return {
      user,
      tasks,
      workspaces,
      teams,
      blogs,
      comments
    }
  }
  public create(user:CreateUserDto){
    return this.userModel.create(user);
  }
  public findUserByEmail(email:string){
    return this.userModel.findOne({email});
  }
  public findById(id:ObjectId){
    return this.userModel.findById(id);
  }  
  public async hashPassword(password:string,salt?:number){
    return await bcrypt.hash(password,salt || 10);
  }
  public async checkPassword(password:string,hash:string){
    return await bcrypt.compare(password,hash);
  }
  public async findUserByName({firstName,lastName}:{firstName:string,lastName:string}){
    return await this.userModel.findOne({firstName,lastName});
  }
  public async findUserByNameOrEmail(id:ObjectId,{email,firstName,lastName}:Partial<{firstName:string,lastName:string,email:string}>){
    return await this.userModel.find({
      $and:[
        {
          $or:[
            {firstName:{$regex:firstName,$options:"i"}},
            {lastName:{$regex:lastName,$options:"i"}},
            {email:{$regex:email,$options:"i"}}
          ]
        },
        {_id:{$ne:id}}
      ]
    }).select(this.userFields);
  }
  public async findAllUsers(){
    return await this.userModel.find();
  }
}
