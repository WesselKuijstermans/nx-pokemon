import { Test} from '@nestjs/testing';
import { MoveService } from './move.service';
import { Move, MoveSchema } from './move.schema';
import { disconnect } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient } from 'mongodb'


describe('MoveService', () => {
  let service: MoveService;
  let mongod: MongoMemoryServer;
  let mongoc: MongoClient;

  const testMoves = [{
    name: 'Tackle',
    type: {
      name: 'Normal',
       weaknesses: [''],
        strengths: [''],
         immunes: ['']
        },
    category: 'Physical',
    makesContact: true,
    pp: 35,
    power: 30,
    accuracy: 95,
  }, {
    name: 'Pound',
    type: {
      name: 'Normal',
       weaknesses: [''],
        strengths: [''],
         immunes: ['']
        },
    category: 'Physical',
    makesContact: true,
    pp: 30,
    power: 40,
    accuracy: 100,
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
        MongooseModule.forFeature([{name: Move.name, schema: MoveSchema}])
      ],
      providers: [MoveService],
    }).compile();

    service = app.get<MoveService>(MoveService);
    mongoc = new MongoClient(uri);
    await mongoc.connect();
  });

  beforeEach(async () => {
    await mongoc.db('test').collection('moves').deleteMany({});
    await mongoc.db('test').collection('moves').insertMany(testMoves)
  });

  afterAll(async () => {
    await mongoc.close();
    await disconnect();
    await mongod.stop();
  })

  describe('getAll', () => {
    it('should return all Move docs', async () => {
      const results = await service.getAll();

      expect(results).toHaveLength(2);
      expect(results.map(r => r.name)).toContain('Tackle')
      expect(results.map(r => r.name)).toContain('Pound')
    });
  })

  describe('getOne', () => {
    it('should return a Move doc', async () => {
      const result = await service.getByName('Tackle');
      const expected = testMoves[0];

      expect(result.name).toEqual(expected.name);
      expect(result.category).toEqual(expected.category);
      expect(result.power).toEqual(expected.power);
    });

    it('should return null when no documents match', async () => {
      const result = await service.getByName('NaN');
      
      expect(result).toEqual(null)
    })
  });


  describe('findByNameAndUpdate', () => {
    it('should update a specific ability', async () => {
      const result = await service.findByNameAndUpdate(
        testMoves[0].name,
        'Test',
        testMoves[0].type,
        testMoves[0].category,
        testMoves[0].makesContact,
        testMoves[0].pp,
        testMoves[0].power,
        testMoves[0].accuracy)

      expect(result).toEqual('Test');
      })
  })

  describe('findByNameAndDelete', () => {
    it('should delete a specific ability', async () => {
      const result = await service.findByNameAndDelete('Tackle');

      expect(result).toEqual(true);
      })
  })
});
