import { PartialType } from '@nestjs/mapped-types';
import { CreateMajorDto } from './create-major.dto';
import { Exclude } from 'class-transformer';

export class UpdateMajorDto extends PartialType(CreateMajorDto) {}
