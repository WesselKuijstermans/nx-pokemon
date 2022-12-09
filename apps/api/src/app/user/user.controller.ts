import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';

import { UserService } from './user.service';

import { User } from '@nx-pokemon/test';
import { InjectToken, Token } from '../auth/token.decorator';
import { OwnedPokemon } from './user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll(): Promise<User[]> {
    return await this.userService.getAll();
  }

  // this method should precede the general getOne method, otherwise it never matches
  @Get('self')
  async getSelf(@InjectToken() token: Token): Promise<User> {
    const result = await this.userService.getOne(token.id);
    return result;
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<User> {
    return await this.userService.getOne(id);
  }

  @Put(':id/team')
  async addToTeam(@Param('id') id: string, @Body() pokemon: OwnedPokemon): Promise<boolean> {
    return await this.userService.addToTeam(id, pokemon);
  }

  @Delete(':id/team/:pokemonId')
  async deleteFromTeam(@Param('id') id: string, @Param('pokemonId') pokemonId: string): Promise<boolean> {
    return await this.userService.removeFromTeam(id, pokemonId);
  }
}
