import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
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
  findAll() {
    return this.applySecondMajorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.applySecondMajorsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.applySecondMajorsService.remove(+id);
  }
}
