import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommonExceptionHandler } from 'src/utils/exceptionHandler';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, payload, info) {
    // JWT 유효성 검사 실패 시 예외를 발생시키는데, 여기서 예외 처리를 커스터마이즈할 수 있음
    if (err || !payload) {
      CommonExceptionHandler.throwForbiddenException(
        '로그인 되어있지 않거나 로그인 기간이 만료되었습니다.',
      );
    }
    return payload; // 유효한 경우, 사용자 정보 반환
  }
}

@Injectable()
export class SudoJwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, payload, info) {
    if (err || !payload) {
      CommonExceptionHandler.throwForbiddenException(
        '로그인 되어있지 않거나 로그인 기간이 만료되었습니다.',
      );
    }
    if (payload.userId !== process.env.SUDO_USER_ID) {
      CommonExceptionHandler.throwForbiddenException(
        '관리자만 접근할 수 있는 기능입니다.',
      );
    }
    return payload;
  }
}
