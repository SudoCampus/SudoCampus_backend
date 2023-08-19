import { IsString, IsNumber, Matches } from 'class-validator';

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
}
