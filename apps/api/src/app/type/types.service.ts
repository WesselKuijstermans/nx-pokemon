import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Type, TypeDocument } from './types.schema';

@Injectable()
export class TypesService {
  constructor(@InjectModel(Type.name) private typeModel: Model<TypeDocument>) {}

  async findAll(): Promise<Type[]> {
    return await this.typeModel.find().exec();
  }

  async findOne(param: string): Promise<Type> {
    return this.typeModel.findOne({ name: {$regex: param, $options : 'i'}}).exec();
  }

  async delete(param : string) {
    const deletedType = await this.typeModel;
    this.typeModel.findByIdAndRemove({ name: param}).exec();
    return deletedType;
  }

}
