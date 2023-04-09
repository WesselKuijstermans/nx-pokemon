import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { OwnedPokemon, User as UserModel, UserDocument } from './user.schema';

import { User, UserInfo } from '@nx-pokemon/test';
// import { Neo4jService } from '../neo4j/neo4j.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserDocument>,
    // private neoService: Neo4jService
  ) {}

  async getAll(): Promise<UserInfo[]> {
    return await this.userModel.find();
  }

  async getOne(trainerId: string): Promise<User | null> {
    const user = await this.userModel.findOne({ trainerId });
    return user;
  }

  async addToTeam(trainerId: string, pokemon: OwnedPokemon) {
    console.log(trainerId, pokemon)
    const resp = await this.userModel.updateOne({trainerId}, {$push : {team: pokemon}})
    return resp.acknowledged;
  }

  async removeFromTeam(trainerId: string, pokemonId: string) {
    console.log(trainerId, pokemonId)
    const resp = await this.userModel.updateOne({trainerId}, {$pull : {team: {name: pokemonId}}})
    return resp.acknowledged;
  }
}
