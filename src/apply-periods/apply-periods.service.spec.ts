import { Test, TestingModule } from '@nestjs/testing';
import { ApplyPeriodsService } from './apply-periods.service';

describe('ApplyPeriodsService', () => {
  let service: ApplyPeriodsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApplyPeriodsService],
    }).compile();

    service = module.get<ApplyPeriodsService>(ApplyPeriodsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
