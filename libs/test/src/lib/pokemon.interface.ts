import { Ability } from "./ability.interface";
import { Item } from "./item.interface";
import { Move } from "./move.interface";
import { Type } from "./type.interface";
import { UserIdentity } from "./user.interface";

export interface Pokemon {
    name: string;
    pokedexNumber: number;
    types: Type[] | undefined;
    hp: number;
    defense: number;
    specialDefense: number;
    attack: number;
    specialAttack: number;
    speed: number;
    evolvesFrom: Pokemon | number | undefined;
    evolvesInto: Pokemon | number | undefined;
    evolutionRequirement: string | undefined;
}

export interface PokedexEntry extends Pokemon {
    abilities: Ability[] | undefined;
    moves: Move[] | undefined;
    createdBy: UserIdentity;
}

export class pokemonFormValues {
    name: any;
    pokedexNumber: any;
    type1: any;
    type2: any;
    hp: any;
    defense: any;
    specialDefense: any;
    attack: any;
    specialAttack: any;
    speed: any;
    evolvesFrom: any;
    evolvesInto: any;
    evolutionRequirement: any;
    Abilities: any;
    Moves: any;
    createdBy: any;
    public constructor(init?: Partial<pokemonFormValues>) {
        Object.assign(this, init);
      }
}

export interface OwnedPokemon extends Pokemon {
    heldItem: Item;
    learnedMoves: Move[];
    ability: Ability
}
