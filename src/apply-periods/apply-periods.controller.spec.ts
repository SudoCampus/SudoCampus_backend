import { Test, TestingModule } from '@nestjs/testing';
import { ApplyPeriodsController } from './apply-periods.controller';
import { ApplyPeriodsService } from './apply-periods.service';

describe('ApplyPeriodsController', () => {
  let controller: ApplyPeriodsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplyPeriodsController],
      providers: [ApplyPeriodsService],
    }).compile();

    controller = module.get<ApplyPeriodsController>(ApplyPeriodsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
