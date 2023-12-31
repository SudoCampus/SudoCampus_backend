import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { CreateMajorDto } from './dto/create-major.dto';
import { UpdateMajorDto } from './dto/update-major.dto';
import { Major } from './entities/major.entity';
import {
  CommonExceptionHandler,
  ReadExceptionHandler,
  CreateExceptionHandler,
  UpdateExceptionHandler,
  DeleteExceptionHandler,
} from 'src/utils/exceptionHandler';
import SuccessHanlder from 'src/utils/SuccessHandler';
import {
  CreateResponse,
  ReadAllResponse,
  ReadOneResponse,
  UpdateResponse,
  DeleteResponse,
} from 'src/utils/SuccessHandler';

@Injectable()
export class MajorsService {
  constructor(
    @InjectRepository(Major)
    private majorRepository: Repository<Major>,
  ) {}

  private MAJOR: string = '학과';
  private DEPARTMENT: string = '학부';
  private INVALID_FOREIGN_KEY_CODE: number = 1452;

  async create(createMajorDto: CreateMajorDto): Promise<CreateResponse<Major>> {
    const isMajorExist = await this.getMajor(createMajorDto.majorName);
    if (isMajorExist) {
      CreateExceptionHandler.throwDuplicatedPrimaryKeyException(
        this.MAJOR,
        createMajorDto.majorName,
      );
    }
    const major: Major = this.majorRepository.create(createMajorDto);
    try {
      return SuccessHanlder.getCreateSuccessResponse<Major>(
        await this.majorRepository.save(major),
        this.MAJOR,
      );
    } catch (error) {
      if (error.errno === this.INVALID_FOREIGN_KEY_CODE) {
        CreateExceptionHandler.throwInvalidForeignKeyException(
          this.DEPARTMENT,
          createMajorDto.departmentName,
        );
      } else {
        CommonExceptionHandler.throwBadRequestException(error.message);
      }
    }
  }

  async findAll(departmentName?: string): Promise<ReadAllResponse<Major>> {
    return SuccessHanlder.getReadAllSuccessResponse<Major>(
      departmentName
        ? await this.majorRepository.find({ where: { departmentName } })
        : await this.majorRepository.find(),
      this.MAJOR,
    );
  }

  async findOne(majorName: string): Promise<ReadOneResponse<Major>> {
    const major = await this.getMajor(majorName);
    if (!major) {
      ReadExceptionHandler.throwNotFoundException(this.MAJOR, majorName);
    }
    return SuccessHanlder.getReadOneSuccessResponse<Major>(major, this.MAJOR);
  }

  async update(
    majorName: string,
    updateMajorDto: UpdateMajorDto,
  ): Promise<UpdateResponse<Major>> {
    try {
      const isMajorExist = await this.getMajor(majorName);
      if (!isMajorExist) {
        UpdateExceptionHandler.throwNotFoundException(this.MAJOR, majorName);
      }
      const result = await this.majorRepository.update(
        { majorName },
        updateMajorDto,
      );
      return SuccessHanlder.getUpdateSuccessResponse(
        result.affected,
        this.MAJOR,
      );
    } catch (error) {
      if (error.errno === this.INVALID_FOREIGN_KEY_CODE) {
        UpdateExceptionHandler.throwInvalidForeignKeyException(
          this.DEPARTMENT,
          updateMajorDto.departmentName,
        );
      } else {
        CommonExceptionHandler.throwBadRequestException(error.message);
      }
    }
  }

  async remove(majorName: string): Promise<DeleteResponse<Major>> {
    const isMajorExist = await this.getMajor(majorName);
    if (!isMajorExist) {
      DeleteExceptionHandler.throwNotFoundException(this.MAJOR, majorName);
    }
    try {
      const result = await this.majorRepository.delete({ majorName });
      return SuccessHanlder.getDeleteSuccessResponse(
        result.affected,
        this.MAJOR,
      );
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
