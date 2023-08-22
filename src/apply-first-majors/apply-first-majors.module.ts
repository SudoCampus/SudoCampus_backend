import { Module } from '@nestjs/common';
import { ApplyFirstMajorsService } from './apply-first-majors.service';
import { ApplyFirstMajorsController } from './apply-first-majors.controller';

@Module({
  controllers: [ApplyFirstMajorsController],
  providers: [ApplyFirstMajorsService],
})
export class ApplyFirstMajorsModule {}
