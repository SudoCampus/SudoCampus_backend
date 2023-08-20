import { IsString, Matches } from 'class-validator';

export class CreateApplyPeriodDto {
  @IsString()
  @Matches(/^(20\d{2})년 [1-2]학기$/, {
    message: '유효한 신청 기간 형식이 아닙니다. (예: 2023년 1학기)',
  })
  applyPeriod: string;
}
