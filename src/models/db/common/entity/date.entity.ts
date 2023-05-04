import { Entity, Column } from 'typeorm';

@Entity()
export class DateEntity {
    @Column({
        type: 'timestamp with time zone',
        default: () => 'CURRENT_TIMESTAMP',
        nullable: false,
    })
    created_at!: Date;

    @Column({
        type: 'timestamp with time zone',
        default: () => 'CURRENT_TIMESTAMP',
        nullable: false,
    })
    updated_at!: Date;
}
