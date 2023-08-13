import { IsString } from 'class-validator';

export class CreateDepartmentDto {
  @IsString()
  departmentName: string;
}
