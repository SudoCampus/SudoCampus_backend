import {
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';

@Entity('apply_second_major')
export class ApplySecondMajor {
  @PrimaryColumn({ name: 'STUDENT_NUMBER' })
  studentNumber: number;

  @PrimaryColumn({ name: 'MAJOR_NAME' })
  majorName: string;

  @PrimaryColumn({ name: 'APPLY_PERIOD' })
  applyPeriod: string;

  @Column({ name: 'USER_GPA_ALL', type: 'float' })
  userGpaAll: number;

  @Column({ name: 'IS_APPROVED' })
  isApproved: string;

  @CreateDateColumn({ name: 'INSERT_DAY' })
  insertDay: Date;

  @UpdateDateColumn({ name: 'MODIFY_DAY' })
  modifyDay: Date;
}
