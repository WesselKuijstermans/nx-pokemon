import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypesController } from './types.controller';
import { TypesService } from './types.service';
import { Type, TypeSchema } from './types.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Type.name, schema: TypeSchema }])],
  controllers: [TypesController],
  providers: [TypesService],
})
export class TypeModule {}