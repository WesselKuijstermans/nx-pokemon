import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PokedexEntry } from './pokemon.schema';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
    constructor(private pokemonService: PokemonService) {}

    @Post()
    async create(@Body() pokemon: PokedexEntry): Promise<string> {
        return this.pokemonService.create(
            pokemon.pokedexNumber,
            pokemon.name,
            pokemon.types,
            pokemon.abilities,
            pokemon.moves,
            pokemon.hp,
            pokemon.attack,
            pokemon.specialAttack,
            pokemon.defense,
            pokemon.specialDefense,
            pokemon.speed,
            pokemon.evolvesFrom,
            pokemon.evolvesInto,
            pokemon.evolutionRequirement,
            pokemon.createdBy
        )
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
    async updateOne(@Param('value') value: number, @Body() pokemon: PokedexEntry): Promise<string> {
        return this.pokemonService.update(
            value,
            pokemon.name,
            pokemon.types,
            pokemon.abilities,
            pokemon.moves,
            pokemon.hp,
            pokemon.attack,
            pokemon.specialAttack,
            pokemon.defense,
            pokemon.specialDefense,
            pokemon.speed,
            pokemon.evolvesFrom,
            pokemon.evolvesInto,
            pokemon.evolutionRequirement,
            pokemon.createdBy,
        )
    }

    @Delete(':value')
    async deleteOne(@Param('value') value: string | number): Promise<boolean> {
        return this.pokemonService.delete(value)
    }
}
