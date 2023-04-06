import { Test, TestingModule } from '@nestjs/testing';
import { AbilityController } from './ability.controller';
import { AbilityService } from './ability.service';
import { Ability, AbilityDocument } from './ability.schema';
import { getModelToken } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

describe('AbilityController', () => {
  let mockAbilityModel: Model<AbilityDocument>;
  let mockRepository: AbilityService;
  let mockController: AbilityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AbilityService,
        { provide: getModelToken(Ability.name), useValue: Model },
      ],
      controllers: [AbilityController],
    }).compile();

    mockAbilityModel = module.get<Model<AbilityDocument>>(
      getModelToken(Ability.name)
    );
    mockRepository = module.get<AbilityService>(AbilityService);

    mockController = new AbilityController(mockRepository);
  });

  it('should be defined', () => {
    expect(mockRepository).toBeDefined();
  });

  it('should return an Ability doc', async () => {
    // arrange
    const ability = new Ability();
    const abilityName = 'Overgrow';
    const spy = jest
      .spyOn(mockAbilityModel, 'findOne') // <- spy on what you want
      .mockResolvedValue(ability as AbilityDocument); // <- Set your resolved value
    // act
    await mockRepository.getByName(abilityName);
    // assert
    expect(spy).toBeCalled();
  });

  it('should return all Ability docs', async () => {
    // arrange
    const ability = new Array<Ability>();
    const spy = jest
      .spyOn(mockAbilityModel, 'find') // <- spy on what you want
      .mockResolvedValue(ability as [AbilityDocument]); // <- Set your resolved value
    // act
    await mockRepository.getAll();
    // assert
    expect(spy).toBeCalled();
  });

  it('should delete an Ability doc', async () => {
    // arrange
    const result = {deletedCount: 0, acknowledged: true}
    const abilityName = 'Test';
    const spy = jest
      .spyOn(mockAbilityModel, 'deleteOne') // <- spy on what you want
      .mockResolvedValue(result) // <- spy on what you want
    // act
    await mockRepository.findByNameAndDelete(abilityName);
    // assert
    expect(spy).toBeCalled();
  });

  it('should update an Ability doc', async () => {
    // arrange
    const result = new Ability()
    const abilityName = 'Test';
    const newAbilityName = 'NewTest'
    const newAbilityEffect = 'NewEffect'
    const spy = jest
      .spyOn(mockAbilityModel, 'findOneAndUpdate') // <- spy on what you want
      .mockResolvedValue(result) // <- Set your resolved value
    // act
    await mockRepository.findByNameAndUpdate(abilityName, newAbilityName, newAbilityEffect);
    // assert
    expect(spy).toBeCalled();
  });

});
