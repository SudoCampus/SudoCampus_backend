import { Test, TestingModule } from '@nestjs/testing';
import { ApplyFirstMajorsService } from './apply-first-majors.service';

describe('ApplyFirstMajorsService', () => {
  let service: ApplyFirstMajorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApplyFirstMajorsService],
    }).compile();

    service = module.get<ApplyFirstMajorsService>(ApplyFirstMajorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
