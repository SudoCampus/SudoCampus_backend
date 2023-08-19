export type ApplySecondMajorResponseType = {
  studentNumber: number;
  majorFrom: string;
  majorTo: string;
  applyPeriod: string;
  userGpaAll?: number;
  userGpaGroup?: number;
  insertDay: Date;
  modifyDay: Date;
};
