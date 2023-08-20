import { Delete, Injectable } from '@nestjs/common';
import { CreateApplyPeriodDto } from './dto/create-apply-period.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplyPeriod } from './entities/apply-period.entity';
import {
  CreateExceptionHandler,
  CommonExceptionHandler,
  ReadExceptionHandler,
  DeleteExceptionHandler,
} from 'src/utils/exceptionHandler';
import SuccessHanlder from 'src/utils/SuccessHandler';

@Injectable()
export class ApplyPeriodsService {
  constructor(
    @InjectRepository(ApplyPeriod)
    private applyPeriodRepository: Repository<ApplyPeriod>,
  ) {}

  private APPLY_PERIOD: string = '지원기간';

  async create(createApplyPeriodDto: CreateApplyPeriodDto) {
    const isApplyPeriodExist = await this.getApplyPeriod(
      createApplyPeriodDto.applyPeriod,
    );
    if (isApplyPeriodExist) {
      CreateExceptionHandler.throwDuplicatedPrimaryKeyException(
        this.APPLY_PERIOD,
        createApplyPeriodDto.applyPeriod,
      );
    }
    const applyPeriod: ApplyPeriod =
      this.applyPeriodRepository.create(createApplyPeriodDto);
    try {
      return SuccessHanlder.getCreateSuccessResponse<ApplyPeriod>(
        await this.applyPeriodRepository.save(applyPeriod),
        this.APPLY_PERIOD,
      );
    } catch (error) {
      CommonExceptionHandler.throwBadRequestException(error.message);
    }
  }

  async findAll() {
    return SuccessHanlder.getReadAllSuccessResponse<ApplyPeriod>(
      await this.applyPeriodRepository.find(),
      this.APPLY_PERIOD,
    );
  }

  async findOne(applyPeriod: string) {
    const applyPeriodEntity = await this.getApplyPeriod(applyPeriod);
    if (!applyPeriodEntity) {
      ReadExceptionHandler.throwNotFoundException(
        this.APPLY_PERIOD,
        applyPeriod,
      );
    }
    return SuccessHanlder.getReadOneSuccessResponse<ApplyPeriod>(
      applyPeriodEntity,
      this.APPLY_PERIOD,
    );
  }

  async remove(applyPeriod: string) {
    const isApplyPeriodExist = await this.getApplyPeriod(applyPeriod);
    if (!isApplyPeriodExist) {
      DeleteExceptionHandler.throwNotFoundException(
        this.APPLY_PERIOD,
        applyPeriod,
      );
    }
    try {
      const result = await this.applyPeriodRepository.delete({ applyPeriod });
      return SuccessHanlder.getDeleteSuccessResponse<ApplyPeriod>(
        result.affected,
        this.APPLY_PERIOD,
      );
    } catch (error) {
      DeleteExceptionHandler.throwConstraintByForeignKeyException(
        this.APPLY_PERIOD,
        applyPeriod,
      );
    }
  }

  async getApplyPeriod(applyPeriod: string) {
    return await this.applyPeriodRepository.findOne({ where: { applyPeriod } });
  }
}
