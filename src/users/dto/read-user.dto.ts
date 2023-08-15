export class ReadUserBasicInfoDto {
  studentNumber: number;
  userId: string;
  userName: string;
  userSemester: number;
  userGpaAll?: number;
  userGpaGroup?: number;
  majorName: string;
  departmentName?: string;
}
