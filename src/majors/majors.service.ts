import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { CreateMajorDto } from './dto/create-major.dto';
import { UpdateMajorDto } from './dto/update-major.dto';
import { Major } from './entities/major.entity';
import {
  ReadExceptionHandler,
  CreateExceptionHandler,
  UpdateExceptionHandler,
  DeleteExceptionHandler,
} from 'src/utils/exceptionHandler';

@Injectable()
export class MajorsService {
  constructor(
    @InjectRepository(Major)
    private majorRepository: Repository<Major>,
  ) {}

  private MAJOR: string = '학과';
  private DEPARTMENT: string = '학부';
  private INVALID_FOREIGN_KEY_CODE: number = 1452;

  async create(createMajorDto: CreateMajorDto): Promise<Major> {
    const isMajorExist = await this.getMajor(createMajorDto.majorName);
    if (isMajorExist) {
      CreateExceptionHandler.throwDuplicatedPrimaryKeyException(
        this.MAJOR,
        createMajorDto.majorName,
      );
    }
    const major: Major = this.majorRepository.create(createMajorDto);
    try {
      return await this.majorRepository.save(major);
    } catch (error) {
      if (error.errno === this.INVALID_FOREIGN_KEY_CODE) {
        CreateExceptionHandler.throwInvalidForeignKeyException(
          this.DEPARTMENT,
          createMajorDto.departmentName,
        );
      } else {
        throw error;
      }
    }
  }

  async findAll(departmentName?: string): Promise<Major[]> {
    return departmentName
      ? await this.majorRepository.find({ where: { departmentName } })
      : await this.majorRepository.find();
  }

  async findOne(majorName: string): Promise<Major> {
    const major = await this.getMajor(majorName);
    if (!major) {
      ReadExceptionHandler.throwNotFoundException(this.MAJOR, majorName);
    }
    return major;
  }

  async update(
    majorName: string,
    updateMajorDto: UpdateMajorDto,
  ): Promise<UpdateResult> {
    try {
      const isMajorExist = await this.getMajor(majorName);
      if (!isMajorExist) {
        UpdateExceptionHandler.throwNotFoundException(this.MAJOR, majorName);
      }
      return await this.majorRepository.update({ majorName }, updateMajorDto);
    } catch (error) {
      if (error.errno === this.INVALID_FOREIGN_KEY_CODE) {
        UpdateExceptionHandler.throwInvalidForeignKeyException(
          this.DEPARTMENT,
          updateMajorDto.departmentName,
        );
      } else {
        throw error;
      }
    }
  }

  async remove(majorName: string): Promise<DeleteResult> {
    const isMajorExist = await this.getMajor(majorName);
    if (!isMajorExist) {
      DeleteExceptionHandler.throwNotFoundException(this.MAJOR, majorName);
    }
    try {
      return await this.majorRepository.delete({ majorName });
    } catch (error) {
      DeleteExceptionHandler.throwConstraintByForeignKeyException(
        this.MAJOR,
        majorName,
      );
    }
  }

  async getMajor(majorName: string): Promise<Major> {
    return await this.majorRepository.findOne({ where: { majorName } });
  }
}
