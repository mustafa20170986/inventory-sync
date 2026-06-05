import { Test, TestingModule } from '@nestjs/testing';
import { SlaesService } from './slaes.service';

describe('SlaesService', () => {
  let service: SlaesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SlaesService],
    }).compile();

    service = module.get<SlaesService>(SlaesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
