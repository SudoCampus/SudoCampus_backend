import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { CreateMajorDto } from './dto/create-major.dto';
import { UpdateMajorDto } from './dto/update-major.dto';
import { Major } from './entities/major.entity';

@Injectable()
export class MajorsService {
  constructor(
    @InjectRepository(Major)
    private majorRepository: Repository<Major>,
  ) {}

  create(createMajorDto: CreateMajorDto) {
    const major: Major = this.majorRepository.create(createMajorDto);
    return this.majorRepository.save(major);
  }

  findAll(): Promise<Major[]> {
    return this.majorRepository.find();
  }

  findOne(majorName: string): Promise<Major> {
    return this.majorRepository.findOne({ where: { majorName } });
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
