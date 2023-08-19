import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplySecondMajor } from './entities/apply-second-major.entity';
import { Repository } from 'typeorm';
import { CreateApplySecondMajorDto } from './dto/create-apply-second-major.dto';
import { CommonExceptionHandler } from 'src/utils/exceptionHandler';

@Injectable()
export class ApplySecondMajorsService {
  constructor(
    @InjectRepository(ApplySecondMajor)
    private applySecondMajorRepository: Repository<ApplySecondMajor>,
  ) {}

  async create(createApplySecondMajorDto: CreateApplySecondMajorDto) {
    try {
      const applySecondMajor: ApplySecondMajor =
        await this.applySecondMajorRepository.create(createApplySecondMajorDto);
      return await this.applySecondMajorRepository.save(applySecondMajor);
    } catch (err: any) {
      CommonExceptionHandler.throwBadRequestException(err.message);
    }
  }

  findAll() {
    return `This action returns all applySecondMajors`;
  }

  findOne(id: number) {
    return `This action returns a #${id} applySecondMajor`;
  }

  remove(id: number) {
    return `This action removes a #${id} applySecondMajor`;
  }

  getApplySecondMajor(studentNumber: number) {
    return `This action returns a applySecondMajor of ${studentNumber}`;
  }
}
