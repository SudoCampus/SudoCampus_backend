import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('department') // department table과 연동
export class Department {
  @PrimaryGeneratedColumn({ name: 'DEPARTMENT_NAME' })
  departmentName: string;

  @CreateDateColumn({ name: 'INSERT_DAY' })
  insertDay: Date;

  @UpdateDateColumn({ name: 'MODIFY_DAY' })
  modifyDay: Date;
}
