import { IsString, IsNumber, IsOptional } from 'class-validator';
import { IsInGpaRange, IsValidStudentNumberLength } from 'src/utils/validators';

export class CreateUserDto {
  @IsNumber()
  @IsValidStudentNumberLength()
  studentNumber: number;
  @IsString()
  userId: string;
  @IsString()
  userPw: string;
  @IsString()
  userName: string;
  @IsString()
  majorName: string;
  @IsNumber()
  userSemester: number;
  @IsOptional()
  @IsNumber()
  @IsInGpaRange()
  userGpaAll?: number;
  @IsOptional()
  @IsNumber()
  @IsInGpaRange()
  userGpaGroup?: number;
}
