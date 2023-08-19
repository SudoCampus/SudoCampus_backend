export type ApplySecondMajorResponseType = {
  studentNumber: number;
  majorFrom: string;
  majorTo: string;
  applyPeriod: string;
  isApproved: string;
  userGpaAll?: number;
  userGpaGroup?: number;
  insertDay: Date;
  modifyDay: Date;
};
