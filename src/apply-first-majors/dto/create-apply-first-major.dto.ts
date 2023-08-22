import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';

enum ApprovalStatus {
  UNDECIDED = '미정',
  APPROVED = '합격',
  REJECTED = '불합격',
}

export class CreateApplyFirstMajorDto {
  @IsNumber()
  studentNumber: number;
  @IsString()
  majorName: string;
  @IsString()
  applyPeriod: string;
  @IsOptional()
  @IsEnum(ApprovalStatus, {
    message: '승인 상태는 미정, 합격, 불합격 중 하나여야 합니다.',
  })
  isApproved: string;
  @IsNumber()
  userGpa: number;
}
