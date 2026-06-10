import { Test, TestingModule } from '@nestjs/testing';
import { ByernotifyService } from './byernotify.service';

describe('ByernotifyService', () => {
  let service: ByernotifyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ByernotifyService],
    }).compile();

    service = module.get<ByernotifyService>(ByernotifyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
