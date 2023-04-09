import { Test } from '@nestjs/testing';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { disconnect } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient } from 'mongodb';


describe('UserService', () => {
  let service: UserService;
  let mongod: MongoMemoryServer;
  let mongoc: MongoClient;

  const testUsers = [
    {
      id: 'jan123',
      name: 'jan',
      emailAddress: 'mail@address.com',
    },
    {
      id: 'dion123',
      name: 'dion',
      emailAddress: 'mail@address.com',
    },
    {
      id: 'davide123',
      name: 'davide',
      emailAddress: 'mail@address.com',
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
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}])
      ],
      providers: [UserService],
    }).compile();

    service = app.get<UserService>(UserService);

    mongoc = new MongoClient(uri);
    await mongoc.connect();
  });

  beforeEach(async () => {
    await mongoc.db('test').collection('users').deleteMany({});
    await mongoc.db('test').collection('users').insertMany(testUsers);
  });

  afterAll(async () => {
    await mongoc.close()
    await disconnect();
    await mongod.stop();
  });

  describe('getAll', () => {
    it('should retrieve all users', async () => {
      const results = await service.getAll();

      expect(results).toHaveLength(3);
      expect(results.map((r) => r.name)).toContain('jan');
      expect(results.map((r) => r.name)).toContain('dion');
      expect(results.map((r) => r.name)).toContain('davide');
    });
  });

  describe('getOne', () => {
    it('should retrieve a specific user', async () => {
      const result = await service.getOne('jan123');

      expect(result).toHaveProperty('name', 'jan');
    });

    it('returns null when user is not found', async () => {
      const result = await service.getOne('niemand');

      expect(result).toEqual(null);
    });
  });
});
