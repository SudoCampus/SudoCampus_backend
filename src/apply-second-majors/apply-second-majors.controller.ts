import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Delete,
} from '@nestjs/common';
import { ApplySecondMajorsService } from './apply-second-majors.service';
import { CreateApplySecondMajorDto } from './dto/create-apply-second-major.dto';

@Controller('apply-second-majors')
export class ApplySecondMajorsController {
  constructor(
    private readonly applySecondMajorsService: ApplySecondMajorsService,
  ) {}

  @Post()
  create(@Body() createApplySecondMajorDto: CreateApplySecondMajorDto) {
    return this.applySecondMajorsService.create(createApplySecondMajorDto);
  }

  @Get()
  findAll(
    @Query('studentNumber') studentNumber: number,
    @Query('majorName') majorName: string,
    @Query('applyPeriod') applyPeriod: string,
  ) {
    return this.applySecondMajorsService.findAll(
      majorName,
      applyPeriod,
      studentNumber,
    );
  }

  @Get()
  findOne(@Param('id') id: string) {
    return null;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.applySecondMajorsService.remove(+id);
  }
}
