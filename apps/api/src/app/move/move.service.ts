import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Type } from '../type/types.schema';
import { Move, MoveDocument } from './move.schema';

@Injectable()
export class MoveService {
  constructor(@InjectModel(Move.name) private moveModel: Model<MoveDocument>) {}

  async create(
    name: string,
    type: Type,
    category: string,
    makesContact: boolean,
    pp: number,
    power: number,
    accuracy: number,
    createdBy: { type: mongoose.Schema.Types.ObjectId; ref: 'User' }
  ) {
    const move = new this.moveModel({
      name,
      type,
      category,
      makesContact,
      pp,
      power,
      accuracy,
      createdBy,
    });
    await move.save();
    return move.name;
  }

  async getAll() {
    const moves = await this.moveModel.find();
    return moves;
  }

  async getByName(value: string) {
    const item = await this.moveModel.findOne({
      name: new RegExp('^' + value + '$', 'i'),
    });
    return item;
  }

  async findByNameAndUpdate(value: string, 
    name: string,
    type: Type,
    category: string,
    makesContact: boolean,
    pp: number,
    power: number,
    accuracy: number,
    createdBy: { type: mongoose.Schema.Types.ObjectId; ref: 'User'}) {
    const item = await this.moveModel.findOneAndUpdate(
      { name: new RegExp('^' + value + '$', 'i') },
      { name, type, category, makesContact, pp, power, accuracy, createdBy },
      { new: true }
    );
    return item.name;
  }

  async findByNameAndDelete(value: string) {
    const response = await this.moveModel.deleteOne({
      name: new RegExp('^' + value + '$', 'i'),
    });
    return response.acknowledged;
  }
}
