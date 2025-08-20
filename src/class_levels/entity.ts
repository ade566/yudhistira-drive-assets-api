import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Expose } from 'class-transformer';
import { Jenjangs } from '../jenjangs/entity';

@Entity('class_levels')
export class ClassLevels {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    name?: string;

    @Column()
    jenjang_id: number;
    
    @ManyToOne(() => Jenjangs, (jenjang) => jenjang.classLevels, { eager: false })
    @JoinColumn({ name: 'jenjang_id' })
    jenjang: Jenjangs;
}
