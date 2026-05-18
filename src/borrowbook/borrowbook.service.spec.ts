import { Test, TestingModule } from '@nestjs/testing';
import { BorrowbookService } from './borrowbook.service';

describe('BorrowbookService', () => {
  let service: BorrowbookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BorrowbookService],
    }).compile();

    service = module.get<BorrowbookService>(BorrowbookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
