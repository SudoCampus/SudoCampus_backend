import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApplyFirstMajorsService } from './apply-first-majors.service';
import { CreateApplyFirstMajorDto } from './dto/create-apply-first-major.dto';
import { UpdateApplyFirstMajorDto } from './dto/update-apply-first-major.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { UseGuards } from '@nestjs/common';

@Controller('apply-first-majors')
export class ApplyFirstMajorsController {
  constructor(
    private readonly applyFirstMajorsService: ApplyFirstMajorsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createApplyFirstMajorDto: CreateApplyFirstMajorDto) {
    return this.applyFirstMajorsService.create(createApplyFirstMajorDto);
  }

  @Get()
  findAll(
    @Query('studentNumber') studentNumber: number,
    @Query('majorFrom') majorFrom: string,
    @Query('majorTo') majorTo: string,
    @Query('applyPeriod') applyPeriod: string,
    @Query('isApproved') isApproved: string,
  ) {
    return this.applyFirstMajorsService.findAll(
      studentNumber,
      majorFrom,
      majorTo,
      applyPeriod,
      isApproved,
    );
  }

  @Get(':studentNumber/:majorName/:applyPeriod')
  findOne(
    @Param('studentNumber') studentNumber: number,
    @Param('majorName') majorName: string,
    @Param('applyPeriod') applyPeriod: string,
  ) {
    return this.applyFirstMajorsService.findOne(
      studentNumber,
      majorName,
      applyPeriod,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':studentNumber/:majorName/:applyPeriod')
  update(
    @Param('studentNumber') studentNumber: number,
    @Param('majorName') majorName: string,
    @Param('applyPeriod') applyPeriod: string,
    @Body() updateApplyFirstMajorDto: UpdateApplyFirstMajorDto,
  ) {
    return this.applyFirstMajorsService.update(
      studentNumber,
      majorName,
      applyPeriod,
      updateApplyFirstMajorDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':stduentNumber/:majorName/:applyPeriod')
  remove(
    @Param('studentNumber') studentNumber: number,
    @Param('majorName') majorName: string,
    @Param('applyPeriod') applyPeriod: string,
  ) {
    return this.applyFirstMajorsService.remove(
      studentNumber,
      majorName,
      applyPeriod,
    );
  }
}
