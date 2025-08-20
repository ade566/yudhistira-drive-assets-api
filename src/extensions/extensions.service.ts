import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Extensions } from './extensions.entity';

@Injectable()
export class ExtensionsService {
    constructor(
        @InjectRepository(Extensions) private extensionsRepo: Repository<Extensions>,
    ) { }

    async findAll(options?: { limit?: number, all?: boolean }) {
        if (options?.limit && options.limit > 0) {
            return this.extensionsRepo.find({ take: options.limit });
        }
        return this.extensionsRepo.find();
    }

    findOne(id: number) {
        return this.extensionsRepo.findOne({ where: { id } });
    }

    async create(data: Partial<Extensions>) {
        const item = this.extensionsRepo.create({
            ...data,
        });

        return this.extensionsRepo.save(item);
    }

    async update(id: number, data: Partial<Extensions>) {
        const item = await this.extensionsRepo.findOneBy({ id });
        if (!item) {
            throw new NotFoundException(`Ekstensi dengan id ${id} tidak ditemukan`);
        }

        Object.assign(item, data);

        return await this.extensionsRepo.save(item);
    }

    async remove(id: number) {
        return this.extensionsRepo.delete(id);
    }
}
