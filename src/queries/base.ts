type MapToDto<T> = {
  [K in keyof T]: T[K] extends string | number | Date ? T[K] : never;
};

export default abstract class BaseQuery<ResT> {
  //sqlText 담는 부분
  protected abstract sqlText;

  //sql실행
  public abstract excuteQuery(): Promise<ResT>;

  //sql실행해 반환하는 과정에서의 형변환 편의함수
  protected mapObjectToDto<T>(object: T): MapToDto<T> {
    const dto: any = {};
    for (const key in object) {
      if (
        typeof object[key] === 'string' ||
        typeof object[key] === 'number' ||
        object[key] instanceof Date
      ) {
        dto[key] = object[key];
      }
    }
    return dto as MapToDto<T>;
  }
}
