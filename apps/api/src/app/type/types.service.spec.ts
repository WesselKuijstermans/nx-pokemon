import { Test } from '@nestjs/testing';
import { TypesService } from './types.service';
import { Type, TypeSchema } from './types.schema';
import { disconnect } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient } from 'mongodb';

describe('MoveService', () => {
  let service: TypesService;
  let mongod: MongoMemoryServer;
  let mongoc: MongoClient;

  const testTypes = [
    {
      name: 'Normal',
      weaknesses: [''],
      strengths: [''],
      immunes: [''],
    },
    {
      name: 'Fire',
      weaknesses: [''],
      strengths: [''],
      immunes: [''],
    },
  ];

  beforeAll(async () => {
    let uri: string;

    const app = await Test.createTestingModule({
      imports: [
        MongooseModule.forRootAsync({
          useFactory: async () => {
            mongod = await MongoMemoryServer.create();
            uri = mongod.getUri();
            return { uri };
          },
        }),
        MongooseModule.forFeature([{ name: Type.name, schema: TypeSchema }]),
      ],
      providers: [TypesService],
    }).compile();

    service = app.get<TypesService>(TypesService);
    mongoc = new MongoClient(uri);
    await mongoc.connect();
  });

  beforeEach(async () => {
    await mongoc.db('test').collection('types').deleteMany({});
    await mongoc.db('test').collection('types').insertMany(testTypes);
  });

  afterAll(async () => {
    await mongoc.close();
    await disconnect();
    await mongod.stop();
  });

  describe('findAll', () => {
    it('should return all Type docs', async () => {
      const results = await service.findAll();

      expect(results).toHaveLength(2);
      expect(results.map((r) => r.name)).toContain('Normal');
      expect(results.map((r) => r.name)).toContain('Fire');
    });
  });

  describe('findOne', () => {
    it('should return a Type doc', async () => {
      const result = await service.findOne('Normal');
      const expected = testTypes[0];

      expect(result.name).toEqual(expected.name);
    });

    it('should return null when no documents match', async () => {
      const result = await service.findOne('NaN');

      expect(result).toEqual(null);
    });
  });

  describe('findByNameAndDelete', () => {
    it('should delete a specific ability', async () => {
      const result = await service.delete('Normal');

      expect(result).toEqual(true);
    });
  });
});
