/* eslint-disable @typescript-eslint/no-var-requires */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Type } from '../type/types.schema';

export type PokedexDocument = HydratedDocument<PokedexEntry>;

@Schema()
export class PokedexEntry {
  @Prop({
    required: true,
    unique: true,
    index: true,
  })
  pokedexNumber: number;

  @Prop({
    required: true,
    unique: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  types: Type[];

  @Prop({
    type: Array<mongoose.Schema.Types.ObjectId>,
    ref: 'Ability',
  })
  abilities: {type: Array<mongoose.Schema.Types.ObjectId>; ref: 'Ability'};

  @Prop({
    type:Array< mongoose.Schema.Types.ObjectId>,
    ref: 'Move',
  })
  moves: {type: Array<mongoose.Schema.Types.ObjectId>; ref: 'Move'}[];

  @Prop()
  hp: number;

  @Prop()
  attack: number;

  @Prop()
  specialAttack: number;

  @Prop()
  defense: number;

  @Prop()
  specialDefense: number;

  @Prop()
  speed: number;

  @Prop()
  evolvesFrom: number;

  @Prop()
  evolvesInto: number;

  @Prop()
  evolutionRequirement: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: true,
  })
  createdBy: { type: mongoose.Schema.Types.ObjectId; ref: 'User' };
}

export const PokedexSchema = SchemaFactory.createForClass(PokedexEntry);
PokedexSchema.plugin(require('mongoose-autopopulate'));
