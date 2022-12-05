import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 as uuid } from 'uuid';

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
}

export const UserSchema = SchemaFactory.createForClass(User);
