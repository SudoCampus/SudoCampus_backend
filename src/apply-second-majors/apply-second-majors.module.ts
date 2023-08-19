import { Module } from '@nestjs/common';
import { ApplySecondMajorsService } from './apply-second-majors.service';
import { ApplySecondMajorsController } from './apply-second-majors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplySecondMajor } from './entities/apply-second-major.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ApplySecondMajor])],
  controllers: [ApplySecondMajorsController],
  providers: [ApplySecondMajorsService],
})
export class ApplySecondMajorsModule {}
