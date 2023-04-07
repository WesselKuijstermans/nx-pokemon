import { Test, TestingModule } from '@nestjs/testing';
import { AbilityService } from './ability.service';
import { Ability, AbilityDocument, AbilitySchema } from './ability.schema';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Model, disconnect } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient } from 'mongodb'

describe('AbilityController', () => {
  let abilityModel: Model<AbilityDocument>;
  let service: AbilityService;
  let mongod: MongoMemoryServer;
  let mongoc: MongoClient;

  const testAbilities = [{
    name: 'Levitate',
    effect: 'Immune to Ground type moves'
  }, {
    name: 'Overgrow',
    effect: 'Deal more Grass type damage when at low HP'
  }]

  beforeAll(async () => {
    let uri: string;

    const app = await Test.createTestingModule({
      imports: [
        MongooseModule.forRootAsync({
          useFactory: async () => {
            mongod = await MongoMemoryServer.create();
            uri = mongod.getUri();
            return {uri};
          }
        }),
        MongooseModule.forFeature([{name: Ability.name, schema: AbilitySchema}])
      ],
      providers: [AbilityService],
    }).compile();

    service = app.get<AbilityService>(AbilityService);
    abilityModel = app.get<Model<AbilityDocument>>(getModelToken(Ability.name))

    mongoc = new MongoClient(uri);
    await mongoc.connect();
  });

  beforeEach(async () => {
    await mongoc.db('test').collection('abilities').deleteMany({});
    await mongoc.db('test').collection('abilities').insertMany(testAbilities)
  });

  afterAll(async () => {
    await mongoc.close();
    await disconnect();
    await mongod.stop();
  })

  describe('getAll', () => {
    it('should return all Ability docs', async () => {
      const results = await service.getAll();

      expect(results).toHaveLength(2);
      expect(results.map(r => r.name)).toContain('Levitate')
      expect(results.map(r => r.name)).toContain('Overgrow')
    });
  })

  describe('getOne', () => {
    it('should return an Ability doc', async () => {
      const result = await service.getByName('Overgrow');
      const expected = testAbilities[1];

      expect(result.name).toEqual(expected.name);
      expect(result.effect).toEqual(expected.effect);
    });

    it('should return null when no documents match', async () => {
      const result = await service.getByName('NaN');
      
      expect(result).toEqual(null)
    })
  });
  

  

  // it('should delete an Ability doc', async () => {
  //   // arrange
  //   const result = {deletedCount: 0, acknowledged: true}
  //   const abilityName = 'Test';
  //   const spy = jest
  //     .spyOn(abilityModel, 'deleteOne') // <- spy on what you want
  //     .mockResolvedValue(result) // <- spy on what you want
  //   // act
  //   await service.findByNameAndDelete(abilityName);
  //   // assert
  //   expect(spy).toBeCalled();
  // });

  // it('should update an Ability doc', async () => {
  //   // arrange
  //   const result = new Ability()
  //   const abilityName = 'Test';
  //   const newAbilityName = 'NewTest'
  //   const newAbilityEffect = 'NewEffect'
  //   const spy = jest
  //     .spyOn(abilityModel, 'findOneAndUpdate') // <- spy on what you want
  //     .mockResolvedValue(result) // <- Set your resolved value
  //   // act
  //   await service.findByNameAndUpdate(abilityName, newAbilityName, newAbilityEffect);
  //   // assert
  //   expect(spy).toBeCalled();
  // });

});
