import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Ability } from '../ability/ability.schema';
import { Move } from '../move/move.schema';
import { Type } from '../type/types.schema';
import { OwnedPokemon, PokedexEntry } from './pokemon.schema';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(PokedexEntry.name) private dexModel: Model<PokedexEntry>,
    @InjectModel(OwnedPokemon.name) private ownedModel: Model<OwnedPokemon>
  ) {}

  async create(
    pokedexNumber: number,
    name: string,
    types: Type[],
    abilities: Ability[],
    moves: Move[],
    hp: number,
    attack: number,
    specialAttack: number,
    defense: number,
    specialDefense: number,
    speed: number,
    evolvesFrom: number,
    evolvesInto: number,
    evolutionRequirement: string,
    createdBy: { type: mongoose.Schema.Types.ObjectId; ref: 'User' }
  ) {
    const dex = new this.dexModel({
      pokedexNumber,
      name,
      types,
      abilities,
      moves,
      hp,
      attack,
      specialAttack,
      defense,
      specialDefense,
      speed,
      evolvesFrom,
      evolvesInto,
      evolutionRequirement,
      createdBy,
    });
    await dex.save();
    return dex.name;
  }

  async getAll() {
    const pokemon = await this.dexModel.find();
    return pokemon;
  }

  async getOne(value: string | number) {
    if (isNaN(Number(value))) {
      const pokemon = await this.dexModel.findOne({
        name: new RegExp('^' + value + '$', 'i'),
      });
      return pokemon;
    }
    const pokemon = await this.dexModel.findOne({pokedexNumber: value});
    return pokemon;
  }


  async update(
    pokedexNumber: number,
    name: string,
    types: Type[],
    abilities: Ability[],
    moves: Move[],
    hp: number,
    attack: number,
    specialAttack: number,
    defense: number,
    specialDefense: number,
    speed: number,
    evolvesFrom: number,
    evolvesInto: number,
    evolutionRequirement: string,
    createdBy: { type: mongoose.Schema.Types.ObjectId; ref: 'User' }
  ) {
    const pokemon = await this.dexModel.findOneAndUpdate(
      { pokedexNumber },
      {
        pokedexNumber,
        name,
        types,
        abilities,
        moves,
        hp,
        attack,
        specialAttack,
        defense,
        specialDefense,
        speed,
        evolvesFrom,
        evolvesInto,
        evolutionRequirement,
        createdBy,
      }
    );
    return pokemon.name;
  }

  async delete(value: number | string) {
    if (isNaN(Number(value))) {
      const resp = await this.dexModel.deleteOne({ name: value });
      return resp.acknowledged;
    }
    const resp = await this.dexModel.deleteOne({ pokedexNumber: value });
    return resp.acknowledged;
  }
}
