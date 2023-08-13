import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Post()
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentsService.create(createDepartmentDto);
  }

  @Get()
  findAll() {
    return this.departmentsService.findAll();
  }

  @Get(':departmentName')
  findOne(@Param('departmentName') departmentName: string) {
    return this.departmentsService.findOne(departmentName);
  }

  @Patch(':departmentName')
  update(
    @Param('departmentName') departmentName: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ) {
    return this.departmentsService.update(departmentName, updateDepartmentDto);
  }

  @Delete(':departmentName')
  remove(@Param('departmentName') departmentName: string) {
    return this.departmentsService.remove(departmentName);
  }
}
