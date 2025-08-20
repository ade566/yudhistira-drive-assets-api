import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Jenjangs } from './entity';

@Injectable()
export class JenjangsService {
    constructor(
        @InjectRepository(Jenjangs) private jenjangsRepo: Repository<Jenjangs>,
    ) { }

    async findAll(options?: { limit?: number, all?: boolean }) {
        if (options?.limit && options.limit > 0) {
            return this.jenjangsRepo.find({ 
                take: options.limit,
                relations: ['classLevels']
             });
        }
        return this.jenjangsRepo.find({
            relations: ['classLevels']
        });
    }

    findOne(id: number) {
        return this.jenjangsRepo.findOne({ where: { id } });
    }

    async create(data: Partial<Jenjangs>) {
        const item = this.jenjangsRepo.create({
            ...data,
        });

        return this.jenjangsRepo.save(item);
    }

    async update(id: number, data: Partial<Jenjangs>) {
        const item = await this.jenjangsRepo.findOneBy({ id });
        if (!item) {
            throw new NotFoundException(`Jenjang dengan id ${id} tidak ditemukan`);
        }

        Object.assign(item, data);

        return await this.jenjangsRepo.save(item);
    }

    async remove(id: number) {
        return this.jenjangsRepo.delete(id);
    }
}
