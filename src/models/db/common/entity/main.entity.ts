import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DateEntity } from './date.entity';

@Entity()
export class MainEntity extends DateEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;
}
