import { UserResponseType } from 'src/users/dto/read-user.dto';
import { User } from '../users/entities/user.entity';

export default class SuccessHanlder {
  public static getCreateSuccessResponse<T>(
    entity: T,
    entityName: string,
  ): CreateResponse<T> {
    return {
      message: `${entityName} 생성에 성공하였습니다.`,
      data: entity,
      status: 'success',
    };
  }

  public static getReadAllSuccessResponse<T>(
    entities: T[],
    entityName: string,
  ): ReadAllResponse<T> {
    return {
      message: `${entityName} 조회에 성공하였습니다.`,
      data: entities,
      status: 'success',
    };
  }

  public static getReadAllWithPaginationSuccessResponse<T>(
    entities: T[],
    entityName: string,
    page: number,
    per_page: number,
    total_pages: number,
  ): ReadAllWithPaginationResponse<T> {
    return {
      message: `${entityName} 조회에 성공하였습니다.`,
      data: entities,
      status: 'success',
      page,
      per_page,
      total_pages,
    };
  }

  public static getReadOneSuccessResponse<T>(
    entity: T,
    entityName: string,
  ): ReadOneResponse<T> {
    return {
      message: `${entityName} 조회에 성공하였습니다.`,
      data: entity,
      status: 'success',
    };
  }

  public static getUpdateSuccessResponse<T>(
    affected: number,
    entityName: string,
  ): UpdateResponse<T> {
    return {
      message: `${entityName} ${affected}개를 갱신하였습니다.`,
      affected,
      status: 'success',
    };
  }

  public static getDeleteSuccessResponse<T>(
    affected: number,
    entityName: string,
  ): DeleteResponse<T> {
    return {
      message: `${entityName} ${affected}개를 삭제하였습니다.`,
      affected,
      status: 'success',
    };
  }

  public static getLoginSuccessResponse(
    userId: string,
    user: UserResponseType,
    accessToken: string,
  ): LoginResponse {
    return {
      message: `${userId}님, 로그인에 성공하였습니다.`,
      data: user,
      accessToken,
      status: 'success',
    };
  }

  public static getLogoutSuccessResponse(): LogoutResponse {
    return {
      message: `로그아웃에 성공하였습니다.`,
      data: null,
      status: 'success',
    };
  }

  public static getVerifySuccessResponse(
    userId: string,
    user: UserResponseType,
  ): VerifyResponse {
    return {
      message: `${userId}님, 인증에 성공하였습니다.`,
      data: user,
      status: 'success',
    };
  }
}

export type CreateResponse<T> = {
  message: string;
  status: 'success';
  data: T;
};

export type ReadAllResponse<T> = {
  message: string;
  status: 'success';
  data: T[];
};

export type ReadAllWithPaginationResponse<T> = {
  message: string;
  status: 'success';
  data: T[];
  page: number;
  per_page: number;
  total_pages: number;
};

export type ReadOneResponse<T> = {
  message: string;
  status: 'success';
  data: T;
};

export type UpdateResponse<T> = {
  message: string;
  status: 'success';
  affected: number;
};

export type DeleteResponse<T> = {
  message: string;
  status: 'success';
  affected: number;
};

export type LoginResponse = {
  message: string;
  status: 'success';
  data: UserResponseType;
  accessToken: string;
};

export type LogoutResponse = {
  message: string;
  status: 'success';
  data: null;
};

export type VerifyResponse = {
  message: string;
  status: 'success';
  data: UserResponseType;
};
