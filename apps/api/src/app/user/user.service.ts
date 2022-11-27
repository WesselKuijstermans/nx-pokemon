import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { User as UserModel, UserDocument } from './user.schema';

import { User, UserInfo } from '@nx-pokemon/test';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserDocument>
  ) {}

  async getAll(): Promise<UserInfo[]> {
    return this.userModel.find();
  }

  async getOne(inputId: string): Promise<User | null> {
    const users = this.userModel.find({ trainerId: inputId });
    return users[0];
  }
}
