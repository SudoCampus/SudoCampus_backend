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
import { ApplySecondMajorsService } from './apply-second-majors.service';
import { CreateApplySecondMajorDto } from './dto/create-apply-second-major.dto';
import { UpdateApplySecondMajorDto } from './dto/update-apply-second-ajor.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { UseGuards } from '@nestjs/common';

@Controller('apply-second-majors')
export class ApplySecondMajorsController {
  constructor(
    private readonly applySecondMajorsService: ApplySecondMajorsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createApplySecondMajorDto: CreateApplySecondMajorDto) {
    return this.applySecondMajorsService.create(createApplySecondMajorDto);
  }

  @Get()
  findAll(
    @Query('studentNumber') studentNumber: number,
    @Query('majorFrom') majorFrom: string,
    @Query('majorTo') majorTo: string,
    @Query('applyPeriod') applyPeriod: string,
    @Query('isApproved') isApproved: string,
  ) {
    return this.applySecondMajorsService.findAll(
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
    return this.applySecondMajorsService.findOne(
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
    @Body() updateApplySecondMajorDto: UpdateApplySecondMajorDto,
  ) {
    return this.applySecondMajorsService.update(
      studentNumber,
      majorName,
      applyPeriod,
      updateApplySecondMajorDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':studentNumber/:majorName/:applyPeriod')
  remove(
    @Param('studentNumber') studentNumber: number,
    @Param('majorName') majorName: string,
    @Param('applyPeriod') applyPeriod: string,
  ) {
    return this.applySecondMajorsService.remove(
      studentNumber,
      majorName,
      applyPeriod,
    );
  }
}
