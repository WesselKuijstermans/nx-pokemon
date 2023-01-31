import { Controller, Get, Post } from '@nestjs/common';
import { Neo4jService } from './neo4j.service';

@Controller('neo4j')
export class Neo4jController {

    constructor(private neoService: Neo4jService) {}
    
    @Post()
    async test() {
        return this.neoService.test();
    }

    @Get('/users')
    async getUsers() {
        return this.neoService.getUsers();
    }
}
