import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "../user/user.schema";

export type AbilityDocument = HydratedDocument<Ability>

@Schema()
export class Ability {
    @Prop({
        required: true,
        unique: true,
        index: true
    })
    name: string

    @Prop({required: true})
    effect: string

    @Prop({
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }     
    )
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}

export const AbilitySchema = SchemaFactory.createForClass(Ability);