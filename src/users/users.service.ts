import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private usersRepo: Repository<User>,
    ) { }

    async create(data: Partial<User>) {
        let hashedPassword: string | undefined;
        
        if (data.password) {
            const salt = await bcrypt.genSalt();
            hashedPassword = await bcrypt.hash(data.password, salt);
        }

        const user = this.usersRepo.create({
            ...data,
            ...(hashedPassword ? { password: hashedPassword } : {}),
        });

        return this.usersRepo.save(user);
    }


    async update(id: number, data: Partial<User>) {
        const user = await this.usersRepo.findOneBy({ id });
        if (!user) {
            throw new NotFoundException(`User dengan id ${id} tidak ditemukan`);
        }

        if (data.password) {
            const salt = await bcrypt.genSalt();
            data.password = await bcrypt.hash(data.password, salt);
        }

        Object.assign(user, data);

        return await this.usersRepo.save(user);
    }
}
