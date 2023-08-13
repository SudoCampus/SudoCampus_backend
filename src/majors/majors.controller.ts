import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MajorsService } from './majors.service';
import { CreateMajorDto } from './dto/create-major.dto';
import { UpdateMajorDto } from './dto/update-major.dto';

@Controller('majors')
export class MajorsController {
  constructor(private readonly majorsService: MajorsService) {}

  @Post()
  create(@Body() createMajorDto: CreateMajorDto) {
    return this.majorsService.create(createMajorDto);
  }

  @Get()
  findAll(@Query('departmentName') departmentName: string) {
    return this.majorsService.findAll(departmentName);
  }

  @Get(':majorName')
  findOne(@Param('majorName') majorName: string) {
    return this.majorsService.findOne(majorName);
  }

  @Patch(':majorName')
  update(
    @Param('majorName') majorName: string,
    @Body() updateMajorDto: UpdateMajorDto,
  ) {
    return this.majorsService.update(majorName, updateMajorDto);
  }

  @Delete(':majorName')
  remove(@Param('majorName') majorName: string) {
    return this.majorsService.remove(majorName);
  }
}
