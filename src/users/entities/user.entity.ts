import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  VirtualColumn,
} from 'typeorm';
import { Major } from 'src/majors/entities/major.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn({ name: 'STUDENT_NUMBER' })
  studentNumber: number;

  @Column({ name: 'USER_ID', unique: true })
  userId: string;

  @Column({ name: 'USER_PW' })
  userPw: string;

  @Column({ name: 'USER_NAME' })
  userName: string;

  @Column({ name: 'MAJOR_NAME' })
  majorName: string;

  @Column({ name: 'USER_SEMESTER' })
  userSemester: number;

  @Column({ name: 'USER_GPA_ALL' })
  userGpaAll: number;

  @Column({ name: 'USER_GPA_GROUP' })
  userGpaGroup: number;

  @CreateDateColumn({ name: 'INSERT_DAY' })
  insertDay: Date;

  @UpdateDateColumn({ name: 'MODIFY_DAY' })
  modifyDay: Date;

  @ManyToOne(() => Major, (major) => major.majorName)
  @JoinColumn({ name: 'MAJOR_NAME', referencedColumnName: 'majorName' })
  major: Major;
}
