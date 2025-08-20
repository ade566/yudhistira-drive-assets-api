import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Formats } from './formats.entity';

@Injectable()
export class FormatsService {
    constructor(
        @InjectRepository(Formats) private formatsRepo: Repository<Formats>,
    ) { }

    async findAll(options?: { limit?: number, all?: boolean }) {
        if (options?.limit && options.limit > 0) {
            return this.formatsRepo.find({ take: options.limit });
        }
        return this.formatsRepo.find();
    }

    findOne(id: number) {
        return this.formatsRepo.findOne({ where: { id } });
    }

    async create(data: Partial<Formats>) {
        const item = this.formatsRepo.create({
            ...data,
        });

        return this.formatsRepo.save(item);
    }

    async update(id: number, data: Partial<Formats>) {
        const item = await this.formatsRepo.findOneBy({ id });
        if (!item) {
            throw new NotFoundException(`Format dengan id ${id} tidak ditemukan`);
        }

        Object.assign(item, data);

        return await this.formatsRepo.save(item);
    }

    async remove(id: number) {
        return this.formatsRepo.delete(id);
    }
}
