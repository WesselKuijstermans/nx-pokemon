import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { Type } from '../type/types.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ default: uuid, index: true })
  id: string;

  @Prop({
    required: true,
    unique: true,
  })
  name: string;

  @Prop({
    required: true,
    match: [
      /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/,
      'please enter a valid email',
    ],
  })
  emailAddress: string;

  @Prop()
  team: OwnedPokemon[];
}

@Schema()
export class OwnedPokemon {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  types: Type[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ability',
  })
  ability: { type: mongoose.Schema.Types.ObjectId; ref: 'Ability'};

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Move',
  })
  learnedMoves: [{type: mongoose.Schema.Types.ObjectId; ref: 'Move'}];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
  })
  heldItem: {type: mongoose.Schema.Types.ObjectId; ref: 'Item'};

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
}

export const UserSchema = SchemaFactory.createForClass(User);
export const OwnedPokemonSchema = SchemaFactory.createForClass(OwnedPokemon);
