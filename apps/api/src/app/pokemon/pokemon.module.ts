import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonController } from './pokemon.controller';
import { PokedexEntry, PokedexSchema } from './pokemon.schema';
import { PokemonService } from './pokemon.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PokedexEntry.name, schema: PokedexSchema }]),
  ],
  controllers: [PokemonController],
  providers: [PokemonService],
})
export class PokemonModule {}
