import { Test, TestingModule } from '@nestjs/testing';
import { LibuserController } from './libuser.controller';

describe('LibuserController', () => {
  let controller: LibuserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LibuserController],
    }).compile();

    controller = module.get<LibuserController>(LibuserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
