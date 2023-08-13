export default class SuccessHanlder {
  public static createSuccessResponse<T>(
    entity: T,
    entityName: string,
  ): CreateResponse<T> {
    return {
      message: `${entityName} 생성에 성공하였습니다.`,
      data: entity,
      status: 'success',
    };
  }

  public static readAllSuccessResponse<T>(
    entities: T[],
    entityName: string,
  ): ReadAllResponse<T> {
    return {
      message: `${entityName} 조회에 성공하였습니다.`,
      data: entities,
      status: 'success',
    };
  }

  public static readOneSuccessResponse<T>(
    entity: T,
    entityName: string,
  ): ReadOneResponse<T> {
    return {
      message: `${entityName} 조회에 성공하였습니다.`,
      data: entity,
      status: 'success',
    };
  }

  public static updateSuccessResponse<T>(
    affected: number,
    entityName: string,
  ): UpdateResponse<T> {
    return {
      message: `${entityName} ${affected}개를 갱신하였습니다.`,
      affected,
      status: 'success',
    };
  }

  public static deleteSuccessResponse<T>(
    affected: number,
    entityName: string,
  ): DeleteResponse<T> {
    return {
      message: `${entityName} ${affected}개를 삭제하였습니다.`,
      affected,
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
