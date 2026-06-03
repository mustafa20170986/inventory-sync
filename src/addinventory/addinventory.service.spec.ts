import { Test, TestingModule } from '@nestjs/testing';
import { AddinventoryService } from './addinventory.service';

describe('AddinventoryService', () => {
  let service: AddinventoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddinventoryService],
    }).compile();

    service = module.get<AddinventoryService>(AddinventoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
