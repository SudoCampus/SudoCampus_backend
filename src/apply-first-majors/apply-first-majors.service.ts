import { Injectable } from '@nestjs/common';
import { CreateApplyFirstMajorDto } from './dto/create-apply-first-major.dto';
import { UpdateApplyFirstMajorDto } from './dto/update-apply-first-major.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplyFirstMajor } from './entities/apply-first-major.entity';
import { Repository } from 'typeorm';
import {
  CommonExceptionHandler,
  CreateExceptionHandler,
} from 'src/utils/exceptionHandler';
import {
  GetApplyFirstMajor,
  GetAllApplyFirstMajors,
} from 'src/utils/queries/apply-first-major';
import { ApplyFirstMajorResponseType } from './dto/read-apply-first-major.dto';
import { StatisticsHanlder } from 'src/utils/StatisticsHandler';
import { StatisticsType } from 'src/utils/StatisticsHandler';
import SuccessHanlder from 'src/utils/SuccessHandler';

@Injectable()
export class ApplyFirstMajorsService {
  constructor(
    @InjectRepository(ApplyFirstMajor)
    private applyFirstMajorRepository: Repository<ApplyFirstMajor>,
  ) {}

  private FIRST_MAJOR: string = '원전공';

  async create(createApplyFirstMajorDto: CreateApplyFirstMajorDto) {
    try {
      const { studentNumber, majorName, applyPeriod } =
        createApplyFirstMajorDto;
      const isApplyFirstMajorExist: ApplyFirstMajor =
        await this.getRawApplyFirstMajor(studentNumber, majorName, applyPeriod);
      if (isApplyFirstMajorExist) {
        CreateExceptionHandler.throwDuplicatedPrimaryKeyException(
          '중복된 원전공 신청',
          `${studentNumber}, ${majorName}, ${applyPeriod}`,
        );
      }
      const applyFirstMajor: ApplyFirstMajor =
        await this.applyFirstMajorRepository.create(createApplyFirstMajorDto);
      await this.applyFirstMajorRepository.save(applyFirstMajor);
    } catch (err: any) {
      CommonExceptionHandler.throwBadRequestException(
        '데이터가 유효하지 않습니다.',
      );
    }
  }

  async findAll(
    studentNumber?: number,
    majorFrom?: string,
    majorTo?: string,
    applyPeriod?: string,
    isApproved?: string,
  ) {
    if (!majorTo) {
      CommonExceptionHandler.throwBadRequestException(
        '원전공 대상 학과를 지정하지 않았습니다.',
      );
    }
    const applyFirstMajors: ApplyFirstMajorResponseType[] =
      await this.getApplyFirstMajors(
        studentNumber,
        majorFrom,
        majorTo,
        applyPeriod,
        isApproved,
      );
    const statistics: StatisticsType = await StatisticsHanlder.getStatistics(
      applyFirstMajors,
      'userGpa',
      1,
    );
    return SuccessHanlder.getReadAllWithStatisticsSuccessResponse(
      applyFirstMajors,
      this.FIRST_MAJOR,
      statistics,
    );
  }

  async findOne(studentNumber: number, majorName: string, applyPeriod: string) {
    const applyFirstMajor: ApplyFirstMajorResponseType =
      await this.getApplyFirstMajor(studentNumber, majorName, applyPeriod);
    if (!applyFirstMajor) {
      CommonExceptionHandler.throwNotFoundException(
        '해당 원전공 신청이 존재하지 않습니다.',
      );
    }
    return SuccessHanlder.getReadOneSuccessResponse<ApplyFirstMajorResponseType>(
      applyFirstMajor,
      this.FIRST_MAJOR,
    );
  }

  async update(
    studentNumber: number,
    majorName: string,
    applyPeriod: string,
    updateApplyFirstMajorDto: UpdateApplyFirstMajorDto,
  ) {
    const applyFirstMajor = await this.getRawApplyFirstMajor(
      studentNumber,
      majorName,
      applyPeriod,
    );
    if (!applyFirstMajor) {
      CommonExceptionHandler.throwNotFoundException(
        '해당 원전공 신청이 존재하지 않습니다.',
      );
    }
    const result = await this.applyFirstMajorRepository.update(
      { studentNumber, majorName, applyPeriod },
      updateApplyFirstMajorDto,
    );
    return SuccessHanlder.getUpdateSuccessResponse(
      result.affected,
      this.FIRST_MAJOR,
    );
  }

  async remove(studentNumber: number, majorName: string, applyPeriod: string) {
    const applyFirstMajor = await this.getRawApplyFirstMajor(
      studentNumber,
      majorName,
      applyPeriod,
    );
    if (!applyFirstMajor) {
      CommonExceptionHandler.throwNotFoundException(
        '해당 원전공 신청이 존재하지 않습니다.',
      );
    }
    const result = await this.applyFirstMajorRepository.delete({
      studentNumber,
      majorName,
      applyPeriod,
    });
    return SuccessHanlder.getDeleteSuccessResponse(
      result.affected,
      this.FIRST_MAJOR,
    );
  }

  async getRawApplyFirstMajor(
    studentNumber: number,
    majorName: string,
    applyPeriod: string,
  ): Promise<ApplyFirstMajor> {
    return await this.applyFirstMajorRepository.findOne({
      where: { studentNumber, majorName, applyPeriod },
    });
  }

  async getApplyFirstMajor(
    studentNumber: number,
    majorName: string,
    applyPeriod: string,
  ): Promise<ApplyFirstMajorResponseType | null> {
    return await new GetApplyFirstMajor(
      studentNumber,
      majorName,
      applyPeriod,
      this.applyFirstMajorRepository,
    ).excuteQuery();
  }

  async getApplyFirstMajors(
    studentNumber?: number,
    majorFrom?: string,
    majorTo?: string,
    applyPeriod?: string,
    isApproved?: string,
  ): Promise<ApplyFirstMajorResponseType[]> {
    return await new GetAllApplyFirstMajors(
      this.applyFirstMajorRepository,
      studentNumber,
      majorFrom,
      majorTo,
      applyPeriod,
      isApproved,
    ).excuteQuery();
  }
}
