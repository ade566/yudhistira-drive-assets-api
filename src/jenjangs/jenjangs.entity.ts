import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Expose } from 'class-transformer';

@Entity('jenjangs')
export class Jenjangs {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    name?: string;

    @Column({ nullable: true })
    slug?: string;
}
