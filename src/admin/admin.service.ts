import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Admin) private adminRepo: Repository<Admin>,
    ) { }

    async create(data: Partial<Admin>) {
        let hashedPassword: string | undefined;

        if (data.password) {
            const salt = await bcrypt.genSalt();
            hashedPassword = await bcrypt.hash(data.password, salt);
        }

        const admin = this.adminRepo.create({
            ...data,
            ...(hashedPassword ? { password: hashedPassword } : {}),
        });

        return this.adminRepo.save(admin);
    }


    async update(id: number, data: Partial<Admin>) {
        const admin = await this.adminRepo.findOneBy({ id });
        if (!admin) {
            throw new NotFoundException(`Admin dengan id ${id} tidak ditemukan`);
        }

        if (data.password) {
            const salt = await bcrypt.genSalt();
            data.password = await bcrypt.hash(data.password, salt);
        }

        Object.assign(admin, data);

        return await this.adminRepo.save(admin);
    }
}
