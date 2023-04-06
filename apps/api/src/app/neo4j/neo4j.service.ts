/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
require('dotenv').config();
import neo4j from 'neo4j-driver';

@Injectable()
export class Neo4jService {
  driver = neo4j.driver(
    process.env.NEO_STRING,
    neo4j.auth.basic('neo4j', process.env.NEO_PASSWORD)
  );

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
      return res.records.map(row => row.get('p'));
    } finally {
      session.close();
    }
  }

  async follow(p1: string, p2:string) {
    const session = this.driver.session();

    try {
      const res = await session.executeWrite(req => req.run(`MERGE (p1:Person {name: $p1}) MERGE (p2:Person {name: $p2}) MERGE (p1)-[:FOLLOWS]->(p2)`, {p1, p2}));
      return res.records.map(row => row.get('p'));
    } finally {
      session.close();
    }
  }

  async getPokemonsFromOtherTeam(p1: string, p2:string) {
    const session = this.driver.session();

    try {
      const res = await session.executeRead(req => req.run(`MATCH (p1:Person {name: $p1})-[:FOLLOWS]->(p2:Person {name: $p2})-[:OWNS]->(m:Pokemon) RETURN m`, {p1, p2}))
      return res.records.map(row => row.get('m'))
    } finally {
      session.close();
    }
  }
}
