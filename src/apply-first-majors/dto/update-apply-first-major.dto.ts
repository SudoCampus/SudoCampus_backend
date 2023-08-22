import { IsEnum } from 'class-validator';

enum ApprovalStatus {
  UNDECIDED = '미정',
  APPROVED = '합격',
  REJECTED = '불합격',
}

export class UpdateApplyFirstMajorDto {
  @IsEnum(ApprovalStatus, {
    message: '승인 상태는 미정, 합격, 불합격 중 하나여야 합니다.',
  })
  isApproved: string;
}
