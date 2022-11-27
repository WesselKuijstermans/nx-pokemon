import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TypesService } from './types.service';
import { Type } from './types.schema';

@Controller('types')
export class TypesController {
  constructor(private readonly typesService: TypesService) {}

  @Get()
  async findAll(): Promise<Type[]> {
    return await this.typesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Type> {
    return this.typesService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.typesService.delete(id);
  }
}