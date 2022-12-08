import { Controller, Post } from '@nestjs/common';
import { Neo4jService } from './neo4j.service';

@Controller('neo4j')
export class Neo4jController {

    constructor(private neoService: Neo4jService) {}
    
    @Post()
    async test() {
        this.neoService.test();
    }
}
