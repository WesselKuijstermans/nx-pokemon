import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Ability } from "../ability/ability.schema";
import { Move } from "../move/move.schema";
import { Type } from "../type/types.schema";
import { User } from "../user/user.schema";

export type PokedexDocument = HydratedDocument<PokedexEntry>
export type OwnedPokemonDocument = HydratedDocument<OwnedPokemon>

@Schema()
export class PokedexEntry {
    @Prop({
        required: true,
        unique: true,
        index: true
    })
    pokedexNumber: number

    @Prop({
        required: true
    })
    name: string

    @Prop({
        required: true
    })
    types: Type[]

    @Prop()
    abilities: Ability[]

    @Prop()
    moves: Move[]

    @Prop()
    hp: number

    @Prop()
    attack: number

    @Prop()
    specialAttack: number

    @Prop()
    defense: number

    @Prop()
    specialDefense: number

    @Prop()
    speed: number

    @Prop()
    evolvesFrom: {type: number, ref: PokedexEntry}

    @Prop()
    evolvesInto: {type: number, ref: PokedexEntry}

    @Prop()
    evolutionRequirement: string
    
    @Prop({required: true})
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: User}
}

@Schema()
export class OwnedPokemon {
    @Prop({
        required: true
    })
    name: string

    @Prop({
        required: true
    })
    types: Type[]

    @Prop()
    ability: Ability

    @Prop()
    learnedMoves: Move[]

    @Prop()
    hp: number

    @Prop()
    attack: number

    @Prop()
    specialAttack: number

    @Prop()
    defense: number

    @Prop()
    specialDefense: number

    @Prop()
    speed: number
}

export const PokedexSchema = SchemaFactory.createForClass(PokedexEntry);
export const OwnedPokemonSchema = SchemaFactory.createForClass(OwnedPokemon);