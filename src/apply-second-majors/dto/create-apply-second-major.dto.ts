import {
  IsString,
  IsNumber,
  Matches,
  IsOptional,
  IsEnum,
} from 'class-validator';

enum ApprovalStatus {
  UNDECIDED = '미정',
  APPROVED = '합격',
  REJECTED = '불합격',
}

export class CreateApplySecondMajorDto {
  @IsNumber()
  studentNumber: number;
  @IsString()
  majorName: string;
  @IsString()
  @Matches(/^[0-9]{4}년 [1-2]학기$/, {
    message: '지원시기의 형식을 "YYYY년 N학기"와 같이 맞추어 주세요.',
  })
  applyPeriod: string;
  @IsOptional()
  @IsEnum(ApprovalStatus, {
    message: '승인 상태는 미정, 합격, 불합격 중 하나여야 합니다.',
  })
  isApproved: string;
}
