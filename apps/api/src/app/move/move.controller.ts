import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Move } from './move.schema';
import { MoveService } from './move.service';

@Controller('move')
export class MoveController {
  constructor(private moveService: MoveService) {}

  @Post()
  async create(@Body() move: Move): Promise<string> {
    return this.moveService.create(
      move.name,
      move.type,
      move.category,
      move.makesContact,
      move.pp,
      move.power,
      move.accuracy,
      move.createdBy
    );
  }

  @Get()
  async getAll(): Promise<Move[]> {
    return this.moveService.getAll()
  }

  @Get(':name')
  async getOne(@Param('name') name: string): Promise<Move> {
    return this.moveService.getByName(name);
  }

  @Put(':name')
  async updateOne(
    @Param('name') name: string,
    @Body() move: Move
  ): Promise<string> {
    return this.moveService.findByNameAndUpdate(
      name,
      move.name,
      move.type,
      move.category,
      move.makesContact,
      move.pp,
      move.power,
      move.accuracy,
      move.createdBy
    );
  }

  @Delete(':name')
  async DeleteOne(@Param('name') name: string): Promise<boolean> {
    return this.moveService.findByNameAndDelete(name);
  }
}
