import { Ability } from "./ability.interface";
import { Item } from "./item.interface";
import { Move } from "./move.interface";
import { Type } from "./type.interface";
import { UserIdentity } from "./user.interface";

export interface Pokemon {
    name: string;
    pokedexNumber: number;
    types: Type[];
    hp: number;
    defense: number;
    specialDefense: number;
    attack: number;
    specialAttack: number;
    Speed: number;
    evolvesFrom: Pokemon | number;
    evolvesInto: Pokemon | number;
    evolutionRequirement: string;
}

export interface PokedexEntry extends Pokemon {
    Abilities: Ability[];
    Moves: Move[];
    createdBy: UserIdentity;
}

export interface OwnedPokemon extends Pokemon {
    heldItem: Item;
    learnedMoves: Move[];
    ability: Ability
}