import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Expose } from 'class-transformer';
import { Assets } from '../entity';

@Entity('asset_contents')
export class AssetContent {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    file: string;

    @Expose()
    get file_url(): string {
        return this.file
            ? `${process.env.APP_URL}${this.file}`
            : '';
    }

    @Column()
    type: string;

    @Column()
    size: number;

    @Column()
    asset_id: number;

    @ManyToOne(() => Assets, (asset) => asset.contents, { nullable: false })
    @JoinColumn({ name: 'asset_id' })
    asset: Assets;
}
