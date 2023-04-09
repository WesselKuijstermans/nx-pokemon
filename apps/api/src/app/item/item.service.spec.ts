import { Test } from '@nestjs/testing';
import { ItemService } from './item.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from './item.schema';
import { disconnect } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient } from 'mongodb'


describe('ItemService', () => {
  let service: ItemService;
  let mongod: MongoMemoryServer;
  let mongoc: MongoClient;

  const testItems = [{
    name: 'Focus Sash',
    effect: "Survives at 1 HP if OHKO'd at full HP"
  }, {
    name: 'Leftovers',
    effect: 'Restores a small amount of HP at the end of your turn'
  }];

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
        MongooseModule.forFeature([{name: Item.name, schema: ItemSchema}])
      ],
      providers: [ItemService],
    }).compile();

    service = app.get<ItemService>(ItemService);

    mongoc = new MongoClient(uri);
    await mongoc.connect();
  });

  beforeEach(async () => {
    await mongoc.db('test').collection('items').deleteMany({});
    await mongoc.db('test').collection('items').insertMany(testItems);
  });

  afterAll(async () => {
    await mongoc.close();
    await disconnect();
    await mongod.stop();
  })

  describe('getAll', () => {
    it('should return all Item docs', async () => {
    const results = await service.getAll();

    expect(results).toHaveLength(2);
    expect(results.map(r => r.name)).toContain('Focus Sash')
    expect(results.map(r => r.name)).toContain('Leftovers')
  });
  })

  describe('getOne', () => {
    it('should return an Item doc', async () => {
      const result = await service.getByName('Focus Sash');
      const expected = testItems[0]

      expect(result.name).toEqual(expected.name);
      expect(result.effect).toEqual(expected.effect);
    });

    it('should return null when no documents match', async () => {
      const result = await service.getByName('NaN');

      expect(result).toEqual(null);
    })
  })

  describe('findByNameAndUpdate', () => {
    it('should update a specific item', async () => {
      const result = await service.findByNameAndUpdate('Focus Sash', 'Test', 'Test');

      expect(result).toEqual('Test');
      })
  })

  describe('findByNameAndDelete', () => {
    it('should delete a specific item', async () => {
      const result = await service.findByNameAndDelete('Focus Sash');

      expect(result).toEqual(true);
      })
  })
});
