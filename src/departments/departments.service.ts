import { Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import SuccessHanlder from 'src/utils/SuccessHandler';
import {
  CreateResponse,
  ReadAllResponse,
  ReadOneResponse,
  UpdateResponse,
  DeleteResponse,
} from 'src/utils/SuccessHandler';
import {
  CreateExceptionHandler,
  ReadExceptionHandler,
  UpdateExceptionHandler,
  DeleteExceptionHandler,
} from 'src/utils/exceptionHandler';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

  private DEPARTMENT: string = '학부';

  async create(
    createDepartmentDto: CreateDepartmentDto,
  ): Promise<CreateResponse<Department>> {
    const isDepartmentExist = await this.getDepartment(
      createDepartmentDto.departmentName,
    );
    if (isDepartmentExist) {
      CreateExceptionHandler.throwDuplicatedPrimaryKeyException(
        this.DEPARTMENT,
        createDepartmentDto.departmentName,
      );
    }
    const department: Department =
      this.departmentRepository.create(createDepartmentDto);
    return SuccessHanlder.getCreateSuccessResponse(
      await this.departmentRepository.save(department),
      this.DEPARTMENT,
    );
  }

  async findAll(): Promise<ReadAllResponse<Department>> {
    return SuccessHanlder.getReadAllSuccessResponse(
      await this.departmentRepository.find(),
      this.DEPARTMENT,
    );
  }

  async findOne(departmentName: string): Promise<ReadOneResponse<Department>> {
    const department: Department = await this.getDepartment(departmentName);
    if (!department) {
      ReadExceptionHandler.throwNotFoundException(
        this.DEPARTMENT,
        departmentName,
      );
    }
    return SuccessHanlder.getReadOneSuccessResponse<Department>(
      department,
      this.DEPARTMENT,
    );
  }

  async update(
    departmentName: string,
    updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<UpdateResponse<Department>> {
    const department: Department = await this.getDepartment(departmentName);
    if (!department) {
      UpdateExceptionHandler.throwNotFoundException(
        this.DEPARTMENT,
        departmentName,
      );
    }
    const result = await this.departmentRepository.update(
      { departmentName },
      updateDepartmentDto,
    );
    return SuccessHanlder.getUpdateSuccessResponse(
      result.affected,
      this.DEPARTMENT,
    );
  }

  async remove(departmentName: string): Promise<DeleteResponse<Department>> {
    const department: Department = await this.getDepartment(departmentName);
    if (!department) {
      DeleteExceptionHandler.throwNotFoundException(
        this.DEPARTMENT,
        departmentName,
      );
    }
    const result = await this.departmentRepository.delete({ departmentName });
    return SuccessHanlder.getDeleteSuccessResponse(
      result.affected,
      this.DEPARTMENT,
    );
  }

  async getDepartment(departmentName: string): Promise<Department> {
    return await this.departmentRepository.findOne({
      where: { departmentName },
    });
  }
}
