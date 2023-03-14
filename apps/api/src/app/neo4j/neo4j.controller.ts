import { Body, Controller, Get, Post } from '@nestjs/common';
import { Neo4jService } from './neo4j.service';

@Controller('neo4j')
export class Neo4jController {

    constructor(private neoService: Neo4jService) {}
    
    @Post('/users/pokemon/')
    async addToTeam(@Body() person:string, pokemon:string) {
        return this.neoService.addToTeam(person, pokemon);
    }

    @Get('/users')
    async getUsers() {
        return this.neoService.getUsers();
    }

    @Post('/users')
    async followUser(@Body() p1:string, p2:string) {
        return this.neoService.follow(p1, p2)
    }
}
