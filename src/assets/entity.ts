import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/entity';
import { Categories } from '../categories/entity';
import { Extensions } from '../extensions/entity';
import { Formats } from '../formats/entity';
import { Groupings } from '../groupings/entity';
import { Jenjangs } from '../jenjangs/entity';
import { ClassLevels } from '../class_levels/entity';
import { Expose } from 'class-transformer';

@Entity('assets')
export class Assets {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, name: 'user_id' })
    user_id?: number;

    @ManyToOne(() => User, { eager: false, nullable: false })
    @JoinColumn({ name: 'user_id' })
    user?: User;

    @Column({ nullable: false, name: 'category_id' })
    category_id?: number;

    @ManyToOne(() => Categories, { eager: false, nullable: false })
    @JoinColumn({ name: 'category_id' })
    category?: Categories;

    @Column({ nullable: false, name: 'extension_id' })
    extension_id?: number;

    @ManyToOne(() => Extensions, { eager: false, nullable: false })
    @JoinColumn({ name: 'extension_id' })
    extension?: Extensions;

    @Column({ nullable: false, name: 'format_id' })
    format_id?: number;

    @ManyToOne(() => Formats, { eager: false, nullable: false })
    @JoinColumn({ name: 'format_id' })
    format?: Formats;

    @Column({ nullable: false, name: 'group_id' })
    group_id?: number;

    @ManyToOne(() => Groupings, { eager: false, nullable: false })
    @JoinColumn({ name: 'group_id' })
    grouping?: Groupings;

    @Column({ nullable: false, name: 'jenjang_id' })
    jenjang_id?: number;

    @ManyToOne(() => Jenjangs, { eager: false, nullable: false })
    @JoinColumn({ name: 'jenjang_id' })
    jenjang?: Jenjangs;

    @Column({ nullable: false, name: 'class_level_id' })
    class_level_id?: number;

    @ManyToOne(() => ClassLevels, { eager: false, nullable: false })
    @JoinColumn({ name: 'class_level_id' })
    classLevel?: ClassLevels;

    @Column({ nullable: false })
    title?: string;

    @Column({ type: 'text', nullable: false })
    description?: string;

    @Column({ nullable: false })
    year?: string;

    @Column({ type: 'text', nullable: false })
    tags?: string;

    @Column({ type: 'text', nullable: false })
    slug?: string;

    @Column({ nullable: true })
    thumbnail?: string;

    @Expose()
    get thumbnail_url(): string {
        return this.thumbnail
            ? `${process.env.APP_URL}${this.thumbnail}`
            : '';
    }
}
