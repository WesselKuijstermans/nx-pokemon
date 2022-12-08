/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
require('dotenv').config();
import neo4j, { Node, Relationship } from 'neo4j-driver';

@Injectable()
export class Neo4jService {
  driver = neo4j.driver(
    process.env.NEO_STRING,
    neo4j.auth.basic('neo4j', process.env.NEO_PASSWORD)
  );

  async test() {
    const session = this.driver.session();

    try {
        const res = await session.executeWrite(req => req.run(`MERGE (p:Person {name: $person})-[r:OWNS]->(mon:Pokemon{name: $pokemon}) RETURN p, r, mon`, {person: 'Wessel', pokemon: 'bulbasaur'}));
        console.log(res.records.map(row => row.get('p')));
    } finally {
        session.close();
    }
  }
}
