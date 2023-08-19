import { IsString, IsNumber } from 'class-validator';

export class CreateApplySecondMajorDto {
  @IsNumber()
  studentNumber: number;
  @IsString()
  majorName: string;
  @IsString()
  applyPeriod: string;
}
