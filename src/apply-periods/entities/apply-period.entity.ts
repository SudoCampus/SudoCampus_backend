import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('apply_period')
export class ApplyPeriod {
  @PrimaryGeneratedColumn({ name: 'APPLY_PERIOD' })
  applyPeriod: string;
}
