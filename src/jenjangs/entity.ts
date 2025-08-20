import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Expose } from 'class-transformer';
import { ClassLevels } from '../class_levels/entity';

@Entity('jenjangs')
export class Jenjangs {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    name?: string;

    @Column({ nullable: true })
    slug?: string;

    @OneToMany(() => ClassLevels, (classLevel) => classLevel.jenjang)
    classLevels: ClassLevels[];
}
