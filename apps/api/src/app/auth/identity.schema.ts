import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type IdentityDocument = Identity & Document;

@Schema()
export class Identity {
    @Prop({
        required: true,
        unique: true,
    })
    username: string;

    @Prop({required: true})
    hash: string;

    @Prop({
        required: true,
        unique: true,
        match: [
          /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/,
          'please enter a valid email',
        ],
      })
      emailAddress: string;
}

export const IdentitySchema = SchemaFactory.createForClass(Identity);
