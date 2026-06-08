import { Test, TestingModule } from '@nestjs/testing';
import { SellernotifyService } from './sellernotify.service';

describe('SellernotifyService', () => {
  let service: SellernotifyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SellernotifyService],
    }).compile();

    service = module.get<SellernotifyService>(SellernotifyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
