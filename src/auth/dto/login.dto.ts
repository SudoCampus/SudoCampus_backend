import { IsString } from 'class-validator';

export class LoginDto {
  @IsString({ message: '아이디가 누락되었습니다.' })
  userId: string;
  @IsString({ message: '비밀번호가 누락되었습니다.' })
  userPw: string;
}
