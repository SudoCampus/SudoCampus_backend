import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Payload } from './jwt/jwt.payload';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import {
  CommonExceptionHandler,
  ReadExceptionHandler,
} from 'src/utils/exceptionHandler';
import { BcryptHanlder } from 'src/utils/BcryptHandler';
import { Request, Response } from 'express';
import {
  LoginResponse,
  LogoutResponse,
  VerifyResponse,
} from 'src/utils/SuccessHandler';
import SuccessHanlder from 'src/utils/SuccessHandler';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  private ID: string = '아이디';

  async login(loginDto: LoginDto, res: Response): Promise<LoginResponse> {
    const { userId, userPw } = loginDto;
    const user: User = await this.usersService.findByUserId(userId);
    if (!user) {
      ReadExceptionHandler.throwNotFoundException(this.ID, userId);
    }
    const isMatched: boolean = await BcryptHanlder.comparePassword(
      userPw,
      user.userPw,
    );
    if (!isMatched) {
      CommonExceptionHandler.throwLoginFailException();
    }
    const payload: Payload = {
      userId,
      studentNumber: user.studentNumber.toString(),
    };
    const token: string = this.jwtService.sign(payload);
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    });
    return SuccessHanlder.getLoginSuccessResponse(userId, user, token);
  }

  async logout(res: Response): Promise<LogoutResponse> {
    res.clearCookie('token');
    return SuccessHanlder.getLogoutSuccessResponse();
  }

  async verify(req: Request): Promise<VerifyResponse> {
    const payload: Payload = req.user as Payload;
    const user: User = await this.usersService.findByUserId(payload.userId);
    return SuccessHanlder.getVerifySuccessResponse(user.userId, user);
  }
}
