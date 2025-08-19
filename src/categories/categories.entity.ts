import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('categories')
export class Categories {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
