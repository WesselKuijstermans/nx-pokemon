import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MoveController } from './move.controller';
import { Move, MoveSchema } from './move.schema';
import { MoveService } from './move.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Move.name, schema: MoveSchema }]),
  ],
  controllers: [MoveController],
  providers: [MoveService],
})
export class MoveModule {}
