import { Test, TestingModule } from '@nestjs/testing';
import { MoveService } from './move.service';
import { Move, MoveDocument } from './move.schema';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { Type } from '../type/types.schema';

describe('MoveService', () => {
  let mockMoveModel: Model<MoveDocument>;
  let service: MoveService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoveService,
        { provide: getModelToken(Move.name), useValue: Model },
      ],
    }).compile();

    mockMoveModel = module.get<Model<MoveDocument>>(
      getModelToken(Move.name)
    );
    service = module.get<MoveService>(MoveService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a Move doc', async () => {
    // arrange
    const move = new Move();
    const moveName = 'Pound';
    const spy = jest
      .spyOn(mockMoveModel, 'findOne') // <- spy on what you want
      .mockResolvedValue(move as MoveDocument); // <- Set your resolved value
    // act
    await service.getByName(moveName);
    // assert
    expect(spy).toBeCalled();
  });

  it('should return all Move docs', async () => {
    // arrange
    const move = new Array<Move>();
    const spy = jest
      .spyOn(mockMoveModel, 'find') // <- spy on what you want
      .mockResolvedValue(move as [MoveDocument]); // <- Set your resolved value
    // act
    await service.getAll();
    // assert
    expect(spy).toBeCalled();
  });

  it('should delete a Move doc', async () => {
    // arrange
    const result = {deletedCount: 0, acknowledged: true}
    const moveName = 'Test';
    const spy = jest
      .spyOn(mockMoveModel, 'deleteOne') // <- spy on what you want
      .mockResolvedValue(result) // <- spy on what you want
    // act
    await service.findByNameAndDelete(moveName);
    // assert
    expect(spy).toBeCalled();
  });

  it('should update a Move doc', async () => {
    // arrange
    const result = new Move()
    const moveName = 'Test';
    const newmoveName = 'NewTest'
    const newMoveType = new Type()
    newMoveType.name = 'Normal';
    newMoveType.immunes = [''];
    newMoveType.strengths = [''];
    newMoveType.weaknesses = [''];
    const newCreatedBy = (await service.getByName('Tackle')).createdBy

    const spy = jest
      .spyOn(mockMoveModel, 'findOneAndUpdate') // <- spy on what you want
      .mockResolvedValue(result) // <- Set your resolved value
    // act
    await service.findByNameAndUpdate(moveName, newmoveName, newMoveType, 'Physical', true, 15, 40, 95, newCreatedBy);
    // assert
    expect(spy).toBeCalled();
  });
});
