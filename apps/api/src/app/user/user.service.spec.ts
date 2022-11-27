import { Test } from '@nestjs/testing';

import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { disconnect, Model } from 'mongoose';
import { MongoClient } from 'mongodb';

import { UserService } from './user.service';
import { User, UserDocument, UserSchema } from './user.schema';

describe('UserService', () => {
  let service: UserService;
  let mongod: MongoMemoryServer;
  let mongoc: MongoClient;
  let userModel: Model<UserDocument>;

  const testMeetups = [{
    topic: 'math',
    datetime: new Date(),
    review: {text: 'Great help! (1)', rating: 4},
    accepted: true,
  }, {
    topic: 'math',
    datetime: new Date(),
    review: {text: 'Great help! (2)', rating: 4},
    accepted: true,
  }, {
    topic: 'math',
    datetime: new Date(),
    review: {text: 'Great help! (3)', rating: 5},
    accepted: true,
  }, {
    topic: 'math',
    datetime: new Date(),
    accepted: true,
  }]

  const testUsers = [{
    id: 'jan123',
    name: 'jan',
    emailAddress: 'mail@address.com',
    tutorTopics: [],
    pupilTopics: [],
    meetups: [],
  }, {
    id: 'dion123',
    name: 'dion',
    emailAddress: 'mail@address.com',
    tutorTopics: [],
    pupilTopics: [],
    meetups: [],
  }, {
    id: 'davide123',
    name: 'davide',
    emailAddress: 'mail@address.com',
    tutorTopics: [],
    pupilTopics: [],
    meetups: [],
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
          },
        }),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      providers: [UserService],
    }).compile();

    service = app.get<UserService>(UserService);
    userModel = app.get<Model<UserDocument>>(getModelToken(User.name));

    mongoc = new MongoClient(uri);
    await mongoc.connect();
  });

  beforeEach(async () => {
    await mongoc.db('test').collection('users').deleteMany({});
    await mongoc.db('test').collection('meetups').deleteMany({});

    const user1 = new userModel(testUsers[0]);
    const user2 = new userModel(testUsers[1]);
    const user3 = new userModel(testUsers[2]);


  });

  afterAll(async () => {
    await mongoc.close();
    await disconnect();
    await mongod.stop();
  });

  describe('getAll', () => {
    it('should retrieve all users', async () => {
      const results = await service.getAll();
  
      expect(results).toHaveLength(3);
      expect(results.map(r => r.name)).toContain('jan');
      expect(results.map(r => r.name)).toContain('dion');
      expect(results.map(r => r.name)).toContain('davide');
    });
    

  describe('getOne', () => {
    it('should retrieve a specific user', async () => {
      const result = await service.getOne('jan123');

      expect(result).toHaveProperty('name', 'jan');
    });
    
    it('returns null when user is not found', async () => {
      const result = await service.getOne('niemand');
      
      expect(result).toBeUndefined();
    });
    
    it('should not give meetups', async () => {
      const result = await service.getOne('jan123');
      
      expect(result).not.toHaveProperty('meetups');
    });
    
    it('gives the average rating', async () => {
      const result = await service.getOne('jan123');
      
      expect(result).toHaveProperty('rating', 4.5);
    });
    
  });
});
})