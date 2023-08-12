import { IsString, Matches, IsOptional } from 'class-validator';

export class CreateMajorDto {
  @IsString()
  majorName: string;
  @IsOptional()
  @IsString()
  departmentName?: string;
}
