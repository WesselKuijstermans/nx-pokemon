import { Module } from '@nestjs/common';
import { Neo4jController } from './neo4j.controller';
import { Neo4jService } from './neo4j.service';

@Module({
  controllers: [Neo4jController],
  providers: [Neo4jService],
})
export class Neo4jModule {}
