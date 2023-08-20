import { Module } from '@nestjs/common';
import { ApplyPeriodsService } from './apply-periods.service';
import { ApplyPeriodsController } from './apply-periods.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplyPeriod } from './entities/apply-period.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ApplyPeriod])],
  controllers: [ApplyPeriodsController],
  providers: [ApplyPeriodsService],
})
export class ApplyPeriodsModule {}
