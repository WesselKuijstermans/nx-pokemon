import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Ability, AbilityDocument } from './ability.schema';

@Injectable()
export class AbilityService {
  constructor(
    @InjectModel(Ability.name) private abilityModel: Model<AbilityDocument>
  ) {}

  async create(name: string, effect: string, createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}) {
    const ability = new this.abilityModel({ name, effect, createdBy });
    await ability.save();
    return ability.name;
  }

  async getAll() {
    const abilities = await this.abilityModel.find();
    console.log(abilities);
    return abilities;
  }

  async getByName(value: string) {
    const ability = await this.abilityModel.findOne({
      name: new RegExp('^' + value + '$', 'i'),
    });
    return ability;
  }

  async findByNameAndUpdate(value: string, newName: string, newEffect: string) {
    const ability = await this.abilityModel.findOneAndUpdate(
      { name: new RegExp('^' + value + '$', 'i') },
      { name: newName, effect: newEffect },
      { new: true }
    );
    return ability.name;
  }

  async findByNameAndDelete(value: string) {
    const response = await this.abilityModel.deleteOne({
      name: new RegExp('^' + value + '$', 'i'),
    });
    return response.acknowledged;
  }
}
