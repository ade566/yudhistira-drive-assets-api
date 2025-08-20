import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Expose } from 'class-transformer';

@Entity('categories')
export class Categories {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    slug?: string;

    @Column({ nullable: true })
    file?: string;

    @Expose()
    get file_url(): string {
      return this.file
        ? `${process.env.APP_URL}${this.file}`
        : '';
    }
}
