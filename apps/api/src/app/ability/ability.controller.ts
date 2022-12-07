import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Ability } from './ability.schema';
import { AbilityService } from './ability.service';

@Controller('ability')
export class AbilityController {
  constructor(private abilityService: AbilityService) {}

  @Post()
  async create(@Body() ability: Ability): Promise<string> {
    return this.abilityService.create(ability.name, ability.effect, ability.createdBy);
  }

  @Get()
  async getAll(): Promise<Ability[]> {
    return this.abilityService.getAll();
  }

  @Get(':name')
  async getOne(@Param('name') name: string): Promise<Ability> {
    return this.abilityService.getByName(name);
  }

  @Put(':name')
  async updateOne(@Param('name') name: string, @Body() ability: Ability): Promise<string> {
    return this.abilityService.findByNameAndUpdate(
      name,
      ability.name,
      ability.effect
    );
  }

  @Delete(':name')
  async DeleteOne(@Param('name') name: string): Promise<boolean> {
    return this.abilityService.findByNameAndDelete(name);
  }
}
