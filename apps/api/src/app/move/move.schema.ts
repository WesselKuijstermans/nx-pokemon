/* eslint-disable @typescript-eslint/no-var-requires */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Type } from '../type/types.schema';

export type MoveDocument = HydratedDocument<Move>;

@Schema()
export class Move {
  @Prop({
    required: true,
    unique: true,
    index: true,
  })
  name: string;

  @Prop({ required: true })
  type: Type;

  @Prop({
    required: true,
    enum: ['Physical', 'Special', 'Status'],
    default: 'Physical',
  })
  category: string;

  @Prop({ required: true })
  makesContact: boolean;

  @Prop({ required: true })
  pp: number;

  @Prop({ required: true })
  power: number;

  @Prop({ required: true })
  accuracy: number;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: true,
  })
  createdBy: { type: mongoose.Schema.Types.ObjectId; ref: 'User' };
}

export const MoveSchema = SchemaFactory.createForClass(Move);
MoveSchema.plugin(require('mongoose-autopopulate'));
