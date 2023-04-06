import { Test, TestingModule } from '@nestjs/testing';
import { ItemService } from './item.service';
import { getModelToken } from '@nestjs/mongoose';
import { Item, ItemDocument } from './item.schema';
import { Model } from 'mongoose';

describe('ItemService', () => {
  let mockItemModel: Model<ItemDocument>;
  let service: ItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemService, 
        { provide: getModelToken(Item.name), useValue: Model },
      
      ],
    }).compile();

    mockItemModel = module.get<Model<ItemDocument>>(
      getModelToken(Item.name)
    );
    service = module.get<ItemService>(ItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an Item doc', async () => {
    // arrange
    const item = new Item();
    const itemName = 'Overgrow';
    const spy = jest
      .spyOn(mockItemModel, 'findOne') // <- spy on what you want
      .mockResolvedValue(item as ItemDocument); // <- Set your resolved value
    // act
    await service.getByName(itemName);
    // assert
    expect(spy).toBeCalled();
  });

  

  it('should return all Item docs', async () => {
    // arrange
    const item = new Array<Item>();
    const spy = jest
      .spyOn(mockItemModel, 'find') // <- spy on what you want
      .mockResolvedValue(item as [ItemDocument]); // <- Set your resolved value
    // act
    await service.getAll();
    // assert
    expect(spy).toBeCalled();
  });
  
  it('should delete an Item doc', async () => {
    // arrange
    const result = {deletedCount: 0, acknowledged: true}
    const itemName = 'Test';
    const spy = jest
      .spyOn(mockItemModel, 'deleteOne') // <- spy on what you want
      .mockResolvedValue(result) // <- spy on what you want
    // act
    await service.findByNameAndDelete(itemName);
    // assert
    expect(spy).toBeCalled();
  });

  it('should update an Item doc', async () => {
    // arrange
    const result = new Item()
    const itemName = 'Test';
    const newItemName = 'NewTest'
    const newItemEffect = 'NewEffect'
    const spy = jest
      .spyOn(mockItemModel, 'findOneAndUpdate') // <- spy on what you want
      .mockResolvedValue(result) // <- Set your resolved value
    // act
    await service.findByNameAndUpdate(itemName, newItemName, newItemEffect);
    // assert
    expect(spy).toBeCalled();
  });
});
