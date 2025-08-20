import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categories } from './entity';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Categories) private categoriesRepo: Repository<Categories>,
    ) { }

    async findAll(options?: { limit?: number, all?: boolean }) {
        if (options?.limit && options.limit > 0) {
            return this.categoriesRepo.find({ take: options.limit });
        }
        return this.categoriesRepo.find();
    }

    findOne(id: number) {
        return this.categoriesRepo.findOne({ where: { id } });
    }

    async create(data: Partial<Categories>) {
        const item = this.categoriesRepo.create({
            ...data,
        });

        return this.categoriesRepo.save(item);
    }

    async update(id: number, data: Partial<Categories>) {
        const item = await this.categoriesRepo.findOneBy({ id });
        if (!item) {
            throw new NotFoundException(`Kategori dengan id ${id} tidak ditemukan`);
        }

        Object.assign(item, data);

        return await this.categoriesRepo.save(item);
    }

    async remove(id: number) {
        return this.categoriesRepo.delete(id);
    }
}
