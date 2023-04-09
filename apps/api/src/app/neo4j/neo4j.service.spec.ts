import { Test, TestingModule } from '@nestjs/testing';
import { Neo4jService } from './neo4j.service';

describe('Neo4jService', () => {
  let neo4jService: Neo4jService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Neo4jService],
    }).compile();

    neo4jService = module.get<Neo4jService>(Neo4jService);
  });

    it('should return all users', async () => {
      const mockResult = [{name: 'Wessel'}, {name: 'MiekeK'}]
      jest.spyOn(neo4jService, 'getUsers').mockResolvedValue(mockResult)
      const result = await neo4jService.getUsers();
      expect(mockResult).toEqual(result);
    });

    it('should return all pokemon from other persons team', async () => {
      const mockResult = [{name: 'Bulbasaur'}];
      jest.spyOn(neo4jService, 'getPokemonsFromOtherTeam').mockResolvedValue(mockResult)
      const result = await neo4jService.getPokemonsFromOtherTeam('MiekeK', 'Wessel')
      expect(mockResult).toEqual(result);
    })

    it('should add a user to the database', async () => {
      jest.spyOn(neo4jService,'addUser').mockResolvedValue(undefined)

      await neo4jService.addUser('Test')

      expect(neo4jService.addUser).toHaveBeenCalled()
    })
});