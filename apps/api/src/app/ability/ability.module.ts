import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AbilityController } from './ability.controller';
import { Ability, AbilitySchema } from './ability.schema';
import { AbilityService } from './ability.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ability.name, schema: AbilitySchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AbilityController],
  providers: [AbilityService],
})
export class AbilityModule {}
