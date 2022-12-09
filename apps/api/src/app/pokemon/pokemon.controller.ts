import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PokedexEntry } from './pokemon.schema';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
    constructor(private pokemonService: PokemonService) {}

    @Post()
    async create(@Body() pokemon: PokedexEntry): Promise<string> {
        return this.pokemonService.create(pokemon)
    }

    @Get()
    async getAll(): Promise<PokedexEntry[]> {
        return this.pokemonService.getAll();
    }

    @Get(':value')
    async getOne(@Param('value') value: string | number): Promise<PokedexEntry> {
        return this.pokemonService.getOne(value);
    }

    @Put(':value')
    async updateOne(@Param('value') value: string | number, @Body() pokemon: PokedexEntry): Promise<string> {
        return await this.pokemonService.update( value, pokemon)
    }

    @Delete(':value')
    async deleteOne(@Param('value') value: string | number): Promise<boolean> {
        return this.pokemonService.delete(value)
    }
}
