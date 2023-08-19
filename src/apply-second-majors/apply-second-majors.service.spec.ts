import { Test, TestingModule } from '@nestjs/testing';
import { ApplySecondMajorsService } from './apply-second-majors.service';

describe('ApplySecondMajorsService', () => {
  let service: ApplySecondMajorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApplySecondMajorsService],
    }).compile();

    service = module.get<ApplySecondMajorsService>(ApplySecondMajorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
