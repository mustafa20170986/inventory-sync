import { Test, TestingModule } from '@nestjs/testing';
import { LibuserService } from './libuser.service';

describe('LibuserService', () => {
  let service: LibuserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LibuserService],
    }).compile();

    service = module.get<LibuserService>(LibuserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
