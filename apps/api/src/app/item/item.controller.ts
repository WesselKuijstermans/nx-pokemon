import { Body, Param, Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { Item } from './item.schema';
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {
  constructor(private itemService: ItemService) {}

  @Post()
  async create(@Body() item: Item): Promise<string> {
    return this.itemService.create(
        item.name,
        item.effect,
        item.createdBy
    );
  }

  @Get()
  async getAll(): Promise<Item[]> {
    return this.itemService.getAll();
  }

  @Get(':name')
  async getOne(@Param('name') name: string): Promise<Item> {
    return this.itemService.getByName(name);
  }

  @Put(':name')
  async updateOne(
    @Param('name') name: string,
    @Body() item: Item
  ): Promise<string> {
    return this.itemService.findByNameAndUpdate(
      name,
      item.name,
      item.effect
    );
  }

  @Delete(':name')
  async DeleteOne(@Param('name') name: string): Promise<boolean> {
    return this.itemService.findByNameAndDelete(name);
  }
}
