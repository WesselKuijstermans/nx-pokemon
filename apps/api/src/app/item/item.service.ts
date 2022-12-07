import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Item, ItemDocument } from './item.schema';

@Injectable()
export class ItemService {
  constructor(
    @InjectModel(Item.name) private itemModel: Model<ItemDocument>
    ) {}

  async create(
    name: string,
    effect: string,
    createdBy: { type: mongoose.Schema.Types.ObjectId; ref: 'User' }
  ) {
    const item = new this.itemModel({ name, effect, createdBy });
    await item.save();
    return item.name;
  }

  async getAll() {
    const items = await this.itemModel.find();
    console.log(items);
    return items;
  }

  async getByName(value: string) {
    const item = await this.itemModel.findOne({
      name: new RegExp('^' + value + '$', 'i'),
    });
    return item;
  }

  async findByNameAndUpdate(value: string, newName: string, newEffect: string) {
    const item = await this.itemModel.findOneAndUpdate(
      { name: new RegExp('^' + value + '$', 'i') },
      { name: newName, effect: newEffect },
      { new: true }
    );
    return item.name;
  }

  async findByNameAndDelete(value: string) {
    const response = await this.itemModel.deleteOne({
      name: new RegExp('^' + value + '$', 'i'),
    });
    return response.acknowledged;
  }
}
