import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('major') // major table과 연동
export class Major {
  @PrimaryGeneratedColumn({ name: 'MAJOR_NAME' })
  majorName: string;

  @Column({ name: 'DEPARTMENT_NAME' })
  departmentName: string;

  @CreateDateColumn({ name: 'INSERT_DAY' })
  insertDay: Date;

  @UpdateDateColumn({ name: 'MODIFY_DAY' })
  modifyDay: Date;
}
