import { ApplySecondMajorResponseType } from 'src/apply-second-majors/dto/read-apply-second-major.dto';
import BaseQuery from './base';
import { Repository } from 'typeorm';
import { ApplySecondMajor } from 'src/apply-second-majors/entities/apply-second-major.entity';

export class GetAllApplySecondMajors extends BaseQuery<
  ApplySecondMajorResponseType[]
> {
  constructor(
    private repository: Repository<ApplySecondMajor>,
    private studentNumber?: number,
    private majorFrom?: string,
    private majorTo?: string,
    private applyPeriod?: string,
    private isApproved?: string,
  ) {
    super();
  }

  sqlText = `
      SELECT 
        b.MAJOR_NAME majorFrom,
        a.MAJOR_NAME majorTo,
        a.APPLY_PERIOD applyPeriod,
        a.IS_APPROVED isApproved,
        a.USER_GPA_ALL userGpaAll,
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
    if (this.majorFrom) {
      conditions.push(`b.MAJOR_NAME = '${this.majorFrom}'`);
    }
    if (this.majorTo) {
      conditions.push(`a.MAJOR_NAME = '${this.majorTo}'`);
    }
    if (this.applyPeriod) {
      conditions.push(`a.APPLY_PERIOD = '${this.applyPeriod}'`);
    }

    if (this.isApproved) {
      conditions.push(`a.IS_APPROVED = '${this.isApproved}'`);
    }

    if (conditions.length > 0) {
      sqlText += ' WHERE ' + conditions.join(' AND ');
    }

    sqlText += ' ORDER BY a.USER_GPA_ALL DESC';

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
          b.MAJOR_NAME majorFrom,
          a.MAJOR_NAME majorTo,
          a.APPLY_PERIOD applyPeriod,
          a.IS_APPROVED isApproved,
          a.USER_GPA_ALL userGpaAll,
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
