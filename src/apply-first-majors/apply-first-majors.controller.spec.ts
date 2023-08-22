import { Test, TestingModule } from '@nestjs/testing';
import { ApplyFirstMajorsController } from './apply-first-majors.controller';
import { ApplyFirstMajorsService } from './apply-first-majors.service';

describe('ApplyFirstMajorsController', () => {
  let controller: ApplyFirstMajorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplyFirstMajorsController],
      providers: [ApplyFirstMajorsService],
    }).compile();

    controller = module.get<ApplyFirstMajorsController>(ApplyFirstMajorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
