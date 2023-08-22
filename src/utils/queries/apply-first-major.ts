import { ApplyFirstMajorResponseType } from 'src/apply-first-majors/dto/read-apply-first-major.dto';
import BaseQuery from './base';
import { Repository } from 'typeorm';
import { ApplyFirstMajor } from 'src/apply-first-majors/entities/apply-first-major.entity';

export class GetAllApplyFirstMajors extends BaseQuery<
  ApplyFirstMajorResponseType[]
> {
  constructor(
    private repository: Repository<ApplyFirstMajor>,
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
        a.USER_GPA userGpa,
        a.INSERT_DAY insertDay,
        a.MODIFY_DAY modifyDay
      FROM apply_first_major a
      LEFT OUTER JOIN user b ON a.STUDENT_NUMBER = b.STUDENT_NUMBER
    `;

  public async excuteQuery(): Promise<ApplyFirstMajorResponseType[]> {
    this.sqlText = this.constructSqlText();
    const result = await this.repository.query(this.sqlText);
    const applyFirstMajors: ApplyFirstMajorResponseType[] = result.map(
      (applyFirstMajor) =>
        this.mapObjectToDto<ApplyFirstMajorResponseType>(applyFirstMajor),
    );
    return applyFirstMajors;
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

export class GetApplyFirstMajor extends BaseQuery<ApplyFirstMajorResponseType | null> {
  constructor(
    private studentNumber: number,
    private majorName: string,
    private applyPeriod: string,
    private repository: Repository<ApplyFirstMajor>,
  ) {
    super();
  }
  sqlText = `
        SELECT 
          b.MAJOR_NAME majorFrom,
          a.MAJOR_NAME majorTo,
          a.APPLY_PERIOD applyPeriod,
          a.IS_APPROVED isApproved,
          a.USER_GPA userGpa,
          a.INSERT_DAY insertDay,
          a.MODIFY_DAY modifyDay
        FROM apply_first_major a
        LEFT OUTER JOIN user b ON a.STUDENT_NUMBER = b.STUDENT_NUMBER
        WHERE a.STUDENT_NUMBER = ${this.studentNumber}
        AND a.MAJOR_NAME = '${this.majorName}'
        AND a.APPLY_PERIOD = '${this.applyPeriod}'
        `;

  public async excuteQuery(): Promise<ApplyFirstMajorResponseType | null> {
    const result = await this.repository.query(this.sqlText);
    if (result.length == 0) return null;
    const applyFirstMajor: ApplyFirstMajorResponseType =
      this.mapObjectToDto<ApplyFirstMajorResponseType>(result[0]);
    return applyFirstMajor;
  }
}
