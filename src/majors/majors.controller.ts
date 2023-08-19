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
import { SudoJwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { UseGuards } from '@nestjs/common';

@Controller('majors')
export class MajorsController {
  constructor(private readonly majorsService: MajorsService) {}

  @UseGuards(SudoJwtAuthGuard)
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

  @UseGuards(SudoJwtAuthGuard)
  @Patch(':majorName')
  update(
    @Param('majorName') majorName: string,
    @Body() updateMajorDto: UpdateMajorDto,
  ) {
    return this.majorsService.update(majorName, updateMajorDto);
  }

  @UseGuards(SudoJwtAuthGuard)
  @Delete(':majorName')
  remove(@Param('majorName') majorName: string) {
    return this.majorsService.remove(majorName);
  }
}
