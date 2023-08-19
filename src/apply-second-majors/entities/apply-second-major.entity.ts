import {
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Matches } from 'class-validator';

@Entity('apply_second_major')
export class ApplySecondMajor {
  @PrimaryColumn({ name: 'STUDENT_NUMBER' })
  studentNumber: number;

  @PrimaryColumn({ name: 'MAJOR_NAME' })
  majorName: string;

  @PrimaryColumn({ name: 'APPLY_PERIOD' })
  @Matches(/^[0-9]{4}년 [1-2]학기$/, {
    message: '지원시기의 형식을 "YYYY년 N학기"와 같이 맞추어 주세요.',
  })
  applyPeriod: string;

  @CreateDateColumn({ name: 'INSERT_DAY' })
  insertDay: Date;

  @UpdateDateColumn({ name: 'MODIFY_DAY' })
  modifyDay: Date;
}
