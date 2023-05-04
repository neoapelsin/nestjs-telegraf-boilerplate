import { Entity, Column, PrimaryColumn } from 'typeorm';
import { DateEntity } from '../common/entity/date.entity';

@Entity({ name: 'users' })
export class UserEntity extends DateEntity {
    @PrimaryColumn()
    id!: string;

    @Column()
    first_name!: string;

    @Column({ nullable: true })
    last_name?: string;

    @Column({ nullable: true })
    username?: string;

    @Column({ default: false })
    isAdmin!: boolean;
}
