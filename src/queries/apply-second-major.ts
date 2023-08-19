import { ApplySecondMajorResponseType } from 'src/apply-second-majors/dto/read-apply-second-major';
import BaseQuery from './base';
import { Repository } from 'typeorm';
import { ApplySecondMajor } from 'src/apply-second-majors/entities/apply-second-major.entity';

export class GetAllApplySecondMajors extends BaseQuery<
  ApplySecondMajorResponseType[]
> {
  constructor(
    private repository: Repository<ApplySecondMajor>,
    private studentNumber?: number,
    private majorName?: string,
    private applyPeriod?: string,
  ) {
    super();
  }

  sqlText = `
      SELECT 
        a.STUDENT_NUMBER studentNumber,
        a.MAJOR_NAME majorTo,
        b.MAJOR_NAME majorFrom,
        a.APPLY_PERIOD applyPeriod,
        b.USER_GPA_ALL userGpaAll,
        b.USER_GPA_GROUP userGpaGroup,
        a.INSERT_DAY insertDay,
        a.MODIFY_DAY modifyDay
      FROM apply_second_major a
      LEFT OUTER JOIN user b ON a.STUDENT_NUMBER = b.STUDENT_NUMBER
    `;

  public async excuteQuery(): Promise<ApplySecondMajorResponseType[]> {
    this.sqlText = this.constructSqlText();
    const result = await this.repository.query(this.sqlText);
    const applySecondMajors: ApplySecondMajorResponseType[] = result.map(
      (applySecondMajor) =>
        this.mapObjectToDto<ApplySecondMajorResponseType>(applySecondMajor),
    );
    return applySecondMajors;
  }

  private constructSqlText(): string {
    let sqlText = this.sqlText;

    const conditions = [];

    if (this.studentNumber) {
      conditions.push(`a.STUDENT_NUMBER = ${this.studentNumber}`);
    }
    if (this.majorName) {
      conditions.push(`a.MAJOR_NAME = '${this.majorName}'`);
    }
    if (this.applyPeriod) {
      conditions.push(`a.APPLY_PERIOD = '${this.applyPeriod}'`);
    }

    if (conditions.length > 0) {
      sqlText += ' WHERE ' + conditions.join(' AND ');
    }

    return sqlText;
  }
}

export class GetApplySecondMajor extends BaseQuery<ApplySecondMajorResponseType | null> {
  constructor(
    private studentNumber: number,
    private majorName: string,
    private applyPeriod: string,
    private repository: Repository<ApplySecondMajor>,
  ) {
    super();
  }
  sqlText = `
        SELECT 
            a.STUDENT_NUMBER studentNumber,
            a.MAJOR_NAME majorTo,
            b.MAJOR_NAME majorFrom,
            a.APPLY_PERIOD applyPeriod,
            b.USER_GPA_ALL userGpaAll,
            b.USER_GPA_GROUP userGpaGroup,
            a.INSERT_DAY insertDay,
            a.MODIFY_DAY modifyDay
        FROM apply_second_major a
        LEFT OUTER JOIN user b ON a.STUDENT_NUMBER = b.STUDENT_NUMBER
        WHERE a.STUDENT_NUMBER = ${this.studentNumber}
        AND a.MAJOR_NAME = '${this.majorName}'
        AND a.APPLY_PERIOD = '${this.applyPeriod}'
        `;

  public async excuteQuery(): Promise<ApplySecondMajorResponseType | null> {
    const result = await this.repository.query(this.sqlText);
    if (result.length == 0) return null;
    const applySecondMajor: ApplySecondMajorResponseType =
      this.mapObjectToDto<ApplySecondMajorResponseType>(result[0]);
    return applySecondMajor;
  }
}
