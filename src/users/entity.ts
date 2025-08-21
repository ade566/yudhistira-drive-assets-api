import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Expose, Exclude } from 'class-transformer';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

	@Exclude()
    @Column()
    password: string;

    @Column({ nullable: true })
    avatar?: string;

    @Expose()
    get avatar_url(): string {
		return this.avatar
			? `${process.env.APP_URL}${this.avatar}`
			: `https://robohash.org/${encodeURIComponent(this.name)}.png`;
    }
}
