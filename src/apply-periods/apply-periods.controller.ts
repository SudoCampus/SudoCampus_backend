import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ApplyPeriodsService } from './apply-periods.service';
import { CreateApplyPeriodDto } from './dto/create-apply-period.dto';
import { SudoJwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { UseGuards } from '@nestjs/common';

@Controller('apply-periods')
export class ApplyPeriodsController {
  constructor(private readonly applyPeriodsService: ApplyPeriodsService) {}

  @UseGuards(SudoJwtAuthGuard)
  @Post()
  create(@Body() createApplyPeriodDto: CreateApplyPeriodDto) {
    return this.applyPeriodsService.create(createApplyPeriodDto);
  }

  @Get()
  findAll() {
    return this.applyPeriodsService.findAll();
  }

  @Get(':applyPeriod')
  findOne(@Param('applyPeriod') applyPeriod: string) {
    return this.applyPeriodsService.findOne(applyPeriod);
  }

  @UseGuards(SudoJwtAuthGuard)
  @Delete(':applyPeriod')
  remove(@Param('applyPeriod') applyPeriod: string) {
    return this.applyPeriodsService.remove(applyPeriod);
  }
}
