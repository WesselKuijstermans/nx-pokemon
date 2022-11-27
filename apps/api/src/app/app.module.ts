/* eslint-disable @typescript-eslint/no-var-requires */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeModule } from './type/types.module'
import { AuthModule } from './auth/auth.module'
require('dotenv').config();

@Module({
  imports: [
  TypeModule,
  AuthModule,
  MongooseModule.forRoot(`mongodb+srv://${process.env.MONGO_USR}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB}`)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
