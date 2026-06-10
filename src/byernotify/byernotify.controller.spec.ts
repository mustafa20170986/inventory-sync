import { Test, TestingModule } from '@nestjs/testing';
import { ByernotifyController } from './byernotify.controller';

describe('ByernotifyController', () => {
  let controller: ByernotifyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ByernotifyController],
    }).compile();

    controller = module.get<ByernotifyController>(ByernotifyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
