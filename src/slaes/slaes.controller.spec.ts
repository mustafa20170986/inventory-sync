import { Test, TestingModule } from '@nestjs/testing';
import { SlaesController } from './slaes.controller';

describe('SlaesController', () => {
  let controller: SlaesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SlaesController],
    }).compile();

    controller = module.get<SlaesController>(SlaesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
