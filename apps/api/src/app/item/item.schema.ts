import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "../user/user.schema";

export type ItemDocument = HydratedDocument<Item>

@Schema()
export class Item {
    @Prop({
        required: true,
        unique: true,
        index: true
    })
    name: string

    @Prop({required: true})
    effect: string

    @Prop({required: true})
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: User}
}

export const ItemSchema = SchemaFactory.createForClass(Item)