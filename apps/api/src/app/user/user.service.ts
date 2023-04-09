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

  async getOne(id: string): Promise<User | null> {
    const user = await this.userModel.findOne({id });
    return user;
  }

  async addToTeam(id: string, pokemon: OwnedPokemon) {
    console.log(id, pokemon)
    const resp = await this.userModel.updateOne({id}, {$push : {team: pokemon}})
    return resp.acknowledged;
  }

  async removeFromTeam(id: string, pokemonId: string) {
    console.log(id, pokemonId)
    const resp = await this.userModel.updateOne({id}, {$pull : {team: {name: pokemonId}}})
    return resp.acknowledged;
  }
}
