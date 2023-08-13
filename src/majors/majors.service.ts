import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { CreateMajorDto } from './dto/create-major.dto';
import { UpdateMajorDto } from './dto/update-major.dto';
import { Major } from './entities/major.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

@Injectable()
export class MajorsService {
  constructor(
    @InjectRepository(Major)
    private majorRepository: Repository<Major>,
  ) {}

  async create(createMajorDto: CreateMajorDto): Promise<Major> {
    const major: Major = this.majorRepository.create(createMajorDto);
    try {
      return await this.majorRepository.save(major);
    } catch (error) {
      if (error.name == 'QueryFailedError') {
        throw new BadRequestException(`
          삽입 정보가 유효하지 않습니다.
          학부(${createMajorDto.departmentName})가 존재하지 않습니다.
        `);
      } else {
        throw error;
      }
    }
  }

  findAll(departmentName?: string): Promise<Major[]> {
    return departmentName
      ? this.majorRepository.find({ where: { departmentName } })
      : this.majorRepository.find();
  }

  findOne(majorName: string): Promise<Major> {
    const major = this.majorRepository.findOne({ where: { majorName } });
    if (!major) {
      throw new NotFoundException(`
        조회 정보가 유효하지 않습니다.
        학과(${majorName})가 존재하지 않습니다.
      `);
    }
    return major;
  }

  update(
    majorName: string,
    updateMajorDto: UpdateMajorDto,
  ): Promise<UpdateResult> {
    return this.majorRepository.update({ majorName }, updateMajorDto);
  }

  remove(majorName: string): Promise<DeleteResult> {
    return this.majorRepository.delete({ majorName });
  }
}
