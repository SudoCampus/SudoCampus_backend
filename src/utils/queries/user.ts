import { UserResponseType } from '../../users/dto/read-user.dto';
import BaseQuery from './base';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';

export class GetAllUsers extends BaseQuery<UserResponseType[]> {
  constructor(
    private repository: Repository<User>,
    private page: number,
    private per_page: number,
  ) {
    super();
  }
  sqlText = `
        SELECT
            user.STUDENT_NUMBER as studentNumber,
            user.USER_ID as userId,
            user.USER_NAME as userName,
            user.USER_EMAIL as userEmail,
            user.USER_SEMESTER as userSemester,
            user.USER_GPA_ALL as userGpaAll,
            user.USER_GPA_GROUP as userGpaGroup,
            user.MAJOR_NAME as majorName,
            major.DEPARTMENT_NAME as departmentName
        FROM
            user
        LEFT JOIN
            major ON user.MAJOR_NAME = major.MAJOR_NAME
        LIMIT ${this.per_page}
        OFFSET ${this.page - 1}
        `;

  public async excuteQuery(): Promise<UserResponseType[]> {
    const result = await this.repository.query(this.sqlText);
    const users: UserResponseType[] = result.map((user) =>
      this.mapObjectToDto<UserResponseType>(user),
    );
    return users;
  }
}

export class GetUserByStudentNumber extends BaseQuery<UserResponseType | null> {
  constructor(
    private studentNumber: number,
    private repository: Repository<User>,
  ) {
    super();
  }
  sqlText = `
    SELECT
        user.STUDENT_NUMBER as studentNumber,
        user.USER_ID as userId,
        user.USER_NAME as userName,
        user.USER_EMAIL as userEmail,
        user.USER_SEMESTER as userSemester,
        user.USER_GPA_ALL as userGpaAll,
        user.USER_GPA_GROUP as userGpaGroup,
        user.MAJOR_NAME as majorName,
        major.DEPARTMENT_NAME as departmentName
    FROM
        user
    LEFT JOIN
        major ON user.MAJOR_NAME = major.MAJOR_NAME
    WHERE
        user.STUDENT_NUMBER = '${this.studentNumber}';
    `;

  public async excuteQuery(): Promise<UserResponseType | null> {
    const result = await this.repository.query(this.sqlText);
    if (result.length == 0) return null;
    const user: UserResponseType = this.mapObjectToDto<UserResponseType>(
      result[0],
    );
    return user;
  }
}

export class GetUserById extends BaseQuery<UserResponseType | null> {
  constructor(private userId: string, private repository: Repository<User>) {
    super();
  }
  sqlText = `
    SELECT
        user.STUDENT_NUMBER as studentNumber,
        user.USER_ID as userId,
        user.USER_NAME as userName,
        user.USER_EMAIL as userEmail,
        user.USER_SEMESTER as userSemester,
        user.USER_GPA_ALL as userGpaAll,
        user.USER_GPA_GROUP as userGpaGroup,
        user.MAJOR_NAME as majorName,
        major.DEPARTMENT_NAME as departmentName
    FROM
        user
    LEFT JOIN
        major ON user.MAJOR_NAME = major.MAJOR_NAME
    WHERE
        user.USER_ID = '${this.userId}';
    `;

  public async excuteQuery(): Promise<UserResponseType | null> {
    const result = await this.repository.query(this.sqlText);
    if (result.length == 0) return null;
    const user: UserResponseType = this.mapObjectToDto<UserResponseType>(
      result[0],
    );
    return user;
  }
}
