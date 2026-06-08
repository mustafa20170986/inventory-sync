import { Test, TestingModule } from '@nestjs/testing';
import { SellernotifyController } from './sellernotify.controller';

describe('SellernotifyController', () => {
  let controller: SellernotifyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SellernotifyController],
    }).compile();

    controller = module.get<SellernotifyController>(SellernotifyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
