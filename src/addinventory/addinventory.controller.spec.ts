import { Test, TestingModule } from '@nestjs/testing';
import { AddinventoryController } from './addinventory.controller';

describe('AddinventoryController', () => {
  let controller: AddinventoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddinventoryController],
    }).compile();

    controller = module.get<AddinventoryController>(AddinventoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
