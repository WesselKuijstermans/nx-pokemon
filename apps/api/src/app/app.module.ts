/* eslint-disable @typescript-eslint/no-var-requires */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeModule } from './type/types.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AbilityModule } from './ability/ability.module';
import { MoveModule } from './move/move.module';
import { ItemModule } from './item/item.module';
import { PokemonModule } from './pokemon/pokemon.module';
import { Neo4jModule } from '../neo4j/neo4j.module';
require('dotenv').config();

@Module({
  imports: [
    TypeModule,
    AuthModule,
    UserModule,
    AbilityModule,
    ItemModule,
    PokemonModule,
    MoveModule,
    Neo4jModule,
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_USR}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB}`
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
