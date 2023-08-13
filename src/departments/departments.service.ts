import { Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

  create(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    const department: Department =
      this.departmentRepository.create(createDepartmentDto);
    return this.departmentRepository.save(department);
  }

  findAll(): Promise<Department[]> {
    return this.departmentRepository.find();
  }

  findOne(departmentName: string): Promise<Department> {
    return this.departmentRepository.findOne({ where: { departmentName } });
  }

  update(
    departmentName: string,
    updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<UpdateResult> {
    return this.departmentRepository.update(
      { departmentName },
      updateDepartmentDto,
    );
  }

  remove(departmentName: string): Promise<DeleteResult> {
    return this.departmentRepository.delete({ departmentName });
  }
}
