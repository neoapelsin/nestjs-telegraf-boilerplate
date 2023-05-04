import { Entity, Column, PrimaryColumn } from 'typeorm';
import { DateEntity } from '../common/entity/date.entity';

@Entity({ name: 'sessions' })
export class SessionEntity extends DateEntity {
    @PrimaryColumn()
    id!: string;

    @Column({ type: 'jsonb' })
    state!: object;
}
