import { NotFoundException, BadRequestException } from '@nestjs/common';

export class CommonExceptionHandler {
  public static throwNotFoundException(message: string): void {
    throw new NotFoundException(message);
  }

  public static throwBadRequestException(message: string): void {
    throw new BadRequestException(message);
  }
}

export class CreateExceptionHandler {
  public static throwInvalidForeignKeyException(
    entityType: string,
    entityName: string,
  ): void {
    throw new BadRequestException(
      `데이터가 참조하는 ${entityType}(${entityName})가 존재하지 않아 올바르게 데이터를 삽입할 수 없습니다.`,
    );
  }
}

export class ReadExceptionHandler {
  public static throwNotFoundException(
    entityType: string,
    entityName: string,
  ): void {
    throw new NotFoundException(
      `${entityType}(${entityName})가 존재하지 않아 데이터를 조회할 수 없습니다.`,
    );
  }
}

export class UpdateExceptionHandler {
  public static throwNotFoundException(
    entityType: string,
    entityName: string,
  ): void {
    throw new NotFoundException(
      `갱신하고자 하는 ${entityType}(${entityName})를 찾을 수 없습니다.`,
    );
  }

  public static throwInvalidForeignKeyException(
    entityType: string,
    entityName: string,
  ): void {
    throw new BadRequestException(
      `데이터가 참조하는 ${entityType}(${entityName})가 존재하지 않아 올바르게 데이터를 갱신할 수 없습니다.`,
    );
  }

  public static throwConstraintByForeignKeyException(
    entityType: string,
    entityName: string,
  ): void {
    throw new BadRequestException(
      `${entityType}(${entityName})를 참조하는 다른 데이터가 존재하여 올바르게 데이터를 갱신할 수 없습니다.`,
    );
  }
}

export class DeleteExceptionHandler {
  public static throwNotFoundException(entityType: string, entityName: string) {
    throw new NotFoundException(
      `삭제하고자 하는 ${entityType}(${entityName})를 찾을 수 없습니다.`,
    );
  }

  public static throwConstraintByForeignKeyException(
    entityType: string,
    entityName: string,
  ) {
    throw new BadRequestException(
      `${entityType}(${entityName})를 참조하는 다른 데이터가 존재하여 올바르게 데이터를 삭제할 수 없습니다.`,
    );
  }
}
