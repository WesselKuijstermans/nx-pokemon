/* eslint-disable @typescript-eslint/no-var-requires */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ItemDocument = HydratedDocument<Item>;

@Schema()
export class Item {
  @Prop({
    required: true,
    unique: true,
    index: true,
  })
  name: string;

  @Prop({ required: true })
  effect: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: true,
  })
  createdBy: { type: mongoose.Schema.Types.ObjectId; ref: 'User' };
}

export const ItemSchema = SchemaFactory.createForClass(Item);
ItemSchema.plugin(require('mongoose-autopopulate'));
