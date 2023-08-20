import { IsString, IsNumber, IsOptional, Matches } from 'class-validator';
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
  @Matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/, {
    message: '이메일 형식이 올바르지 않습니다.',
  })
  userEmail: string;
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
