import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PokedexEntry } from './pokemon.schema';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(PokedexEntry.name) private dexModel: Model<PokedexEntry>
  ) {}

  async create(pokemon: PokedexEntry) {
    const dex = new this.dexModel({
      pokedexNumber: pokemon.pokedexNumber,
      name: pokemon.name,
      types: pokemon.types,
      abilities: pokemon.abilities,
      moves: pokemon.moves,
      hp: pokemon.hp,
      attack: pokemon.attack,
      specialAttack: pokemon.specialAttack,
      defense: pokemon.defense,
      specialDefense: pokemon.specialDefense,
      speed: pokemon.speed,
      evolvesFrom: pokemon.evolvesFrom,
      evolvesInto: pokemon.evolvesInto,
      evolutionRequirement: pokemon.evolutionRequirement,
      createdBy: pokemon.createdBy,
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
    const pokemon = await this.dexModel.findOne({ pokedexNumber: value });
    return pokemon;
  }

  async update(value: number | string, input: PokedexEntry) {
    if (isNaN(Number(value))) {
      const pokemon = await this.dexModel.findOneAndUpdate(
        { name: value },
        {
          pokedexNumber: input.pokedexNumber,
          name: input.name,
          types: input.types,
          abilities: input.abilities,
          moves: input.moves,
          hp: input.hp,
          attack: input.attack,
          specialAttack: input.specialAttack,
          defense: input.defense,
          specialDefense: input.specialDefense,
          speed: input.speed,
          evolvesFrom: input.evolvesFrom,
          evolvesInto: input.evolvesInto,
          evolutionRequirement: input.evolutionRequirement,
          createdBy: input.createdBy,
        }
      );
      return pokemon.name;
    }
    const pokemon = await this.dexModel.findOneAndUpdate(
      { pokedexNumber: value },
      {
        pokedexNumber: input.pokedexNumber,
        name: input.name,
        types: input.types,
        abilities: input.abilities,
        moves: input.moves,
        hp: input.hp,
        attack: input.attack,
        specialAttack: input.specialAttack,
        defense: input.defense,
        specialDefense: input.specialDefense,
        speed: input.speed,
        evolvesFrom: input.evolvesFrom,
        evolvesInto: input.evolvesInto,
        evolutionRequirement: input.evolutionRequirement,
        createdBy: input.createdBy,
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
