import { Test, TestingModule } from '@nestjs/testing';
import { ApplySecondMajorsController } from './apply-second-majors.controller';
import { ApplySecondMajorsService } from './apply-second-majors.service';

describe('ApplySecondMajorsController', () => {
  let controller: ApplySecondMajorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplySecondMajorsController],
      providers: [ApplySecondMajorsService],
    }).compile();

    controller = module.get<ApplySecondMajorsController>(ApplySecondMajorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
