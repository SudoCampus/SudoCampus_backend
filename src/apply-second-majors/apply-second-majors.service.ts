import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplySecondMajor } from './entities/apply-second-major.entity';
import { Repository } from 'typeorm';
import { CreateApplySecondMajorDto } from './dto/create-apply-second-major.dto';
import {
  CommonExceptionHandler,
  CreateExceptionHandler,
  ReadExceptionHandler,
} from 'src/utils/exceptionHandler';
import {
  GetAllApplySecondMajors,
  GetApplySecondMajor,
} from 'src/queries/apply-second-major';
import { ApplySecondMajorResponseType } from './dto/read-apply-second-major';
import SuccessHanlder from 'src/utils/SuccessHandler';

@Injectable()
export class ApplySecondMajorsService {
  constructor(
    @InjectRepository(ApplySecondMajor)
    private applySecondMajorRepository: Repository<ApplySecondMajor>,
  ) {}

  private SECOND_MAJOR: string = '복수전공';

  async create(createApplySecondMajorDto: CreateApplySecondMajorDto) {
    try {
      const { studentNumber, majorName, applyPeriod } =
        createApplySecondMajorDto;
      const isApplySecondMajorExist = await this.getRawApplySecondMajor(
        studentNumber,
        majorName,
        applyPeriod,
      );
      if (isApplySecondMajorExist) {
        CreateExceptionHandler.throwDuplicatedPrimaryKeyException(
          '중복된 복수전공 신청',
          `${studentNumber}, ${majorName}, ${applyPeriod}`,
        );
      }
      const applySecondMajor: ApplySecondMajor =
        await this.applySecondMajorRepository.create(createApplySecondMajorDto);
      await this.applySecondMajorRepository.save(applySecondMajor);
      return SuccessHanlder.getCreateSuccessResponse<ApplySecondMajorResponseType>(
        await this.getApplySecondMajor(studentNumber, majorName, applyPeriod),
        this.SECOND_MAJOR,
      );
    } catch (err: any) {
      CommonExceptionHandler.throwBadRequestException(
        '데이터가 유효하지 않습니다.',
      );
    }
  }

  async findAll(
    majorName?: string,
    applyPeriod?: string,
    studentNumber?: number,
  ) {
    const applySecondMajors = await this.getApplySecondMajors(
      studentNumber,
      majorName,
      applyPeriod,
    );
    return SuccessHanlder.getReadAllSuccessResponse<ApplySecondMajorResponseType>(
      applySecondMajors,
      this.SECOND_MAJOR,
    );
  }

  async findOne(majorName: string, applyPeriod: string, studentNumber: number) {
    const applySecondMajor = await this.getApplySecondMajor(
      studentNumber,
      majorName,
      applyPeriod,
    );
    if (!applySecondMajor) {
      CommonExceptionHandler.throwNotFoundException(
        '해당 복수전공 신청이 존재하지 않습니다.',
      );
    }
    return SuccessHanlder.getReadOneSuccessResponse<ApplySecondMajorResponseType>(
      applySecondMajor,
      this.SECOND_MAJOR,
    );
  }

  remove(id: number) {
    return `This action removes a #${id} applySecondMajor`;
  }

  async getRawApplySecondMajor(
    studentNumber: number,
    majorName: string,
    applyPeriod: string,
  ): Promise<ApplySecondMajor> {
    return await this.applySecondMajorRepository.findOne({
      where: { studentNumber, majorName, applyPeriod },
    });
  }

  async getApplySecondMajor(
    studentNumber: number,
    majorName: string,
    applyPeriod: string,
  ): Promise<ApplySecondMajorResponseType | null> {
    return await new GetApplySecondMajor(
      studentNumber,
      majorName,
      applyPeriod,
      this.applySecondMajorRepository,
    ).excuteQuery();
  }

  async getApplySecondMajors(
    studentNumber?: number,
    majorName?: string,
    applyPeriod?: string,
  ): Promise<ApplySecondMajorResponseType[]> {
    return await new GetAllApplySecondMajors(
      this.applySecondMajorRepository,
      studentNumber,
      majorName,
      applyPeriod,
    ).excuteQuery();
  }
}
