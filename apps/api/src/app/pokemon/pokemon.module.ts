import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonController } from './pokemon.controller';
import { OwnedPokemon, OwnedPokemonSchema, PokedexEntry, PokedexSchema } from './pokemon.schema';
import { PokemonService } from './pokemon.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PokedexEntry.name, schema: PokedexSchema }]),
    MongooseModule.forFeature([{ name: OwnedPokemon.name, schema: OwnedPokemonSchema }]),
  ],
  controllers: [PokemonController],
  providers: [PokemonService],
})
export class PokemonModule {}
