import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Type } from '../type/types.schema';
import { User } from '../user/user.schema';

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
  description: string;

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

  @Prop({ required: true })
  createdBy: { type: mongoose.Schema.Types.ObjectId; ref: User };
}

export const MoveSchema = SchemaFactory.createForClass(Move);