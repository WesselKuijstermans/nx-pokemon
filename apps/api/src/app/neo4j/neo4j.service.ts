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
        const res = await session.executeWrite(req => req.run(`MERGE (p:Person {name: $person})-[:OWNS]->(mon:Pokemon{name: $pokemon}) RETURN p.name as p, mon.name as mon`, {person: 'Wessel', pokemon: 'bulbasaur'}));
        const person = res.records.map(row => row.get('p'));
        const pokemon = res.records.map(row => row.get('mon'));
        const results = {person, pokemon}
        return results;
    } finally {
        session.close();
    }
  }

  async addUser(username: string) {
    const session = this.driver.session();

    try {
      const res = await session.executeWrite(req => req.run(`MERGE (p:Person {name: $person})`, {person: username}));
      return res.records.map(row => row.get('p'));
    } finally {
      session.close();
    }
  }

  async getUsers() {
    const session = this.driver.session();

    try {
      const res = await session.executeRead(req => req.run('MATCH (p:Person) RETURN p'));
      return res.records.map(row => row.get('p'));
    } finally {
      session.close();
    }
  }

  async addToTeam(person: string, pokemon: string) {
    const session = this.driver.session();

    try {
      const res = await session.executeWrite(req => req.run(`MERGE (p:Person {name: $person}) MERGE (mon:Pokemon {name: $pokemon}) MERGE (p)-[:OWNS]->(mon)`, {person, pokemon}));
      return res.records.map(row => row.get('p'))
    } finally {
      session.close()
    }
  }
}
