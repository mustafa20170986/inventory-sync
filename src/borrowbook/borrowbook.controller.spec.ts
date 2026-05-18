import { Test, TestingModule } from '@nestjs/testing';
import { BorrowbookController } from './borrowbook.controller';

describe('BorrowbookController', () => {
  let controller: BorrowbookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BorrowbookController],
    }).compile();

    controller = module.get<BorrowbookController>(BorrowbookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
