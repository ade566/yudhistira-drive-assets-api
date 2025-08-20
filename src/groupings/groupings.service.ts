import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Groupings } from './groupings.entity';

@Injectable()
export class GroupingsService {
    constructor(
        @InjectRepository(Groupings) private groupingsRepo: Repository<Groupings>,
    ) { }

    async findAll(options?: { limit?: number, all?: boolean }) {
        if (options?.limit && options.limit > 0) {
            return this.groupingsRepo.find({ take: options.limit });
        }
        return this.groupingsRepo.find();
    }

    findOne(id: number) {
        return this.groupingsRepo.findOne({ where: { id } });
    }

    async create(data: Partial<Groupings>) {
        const item = this.groupingsRepo.create({
            ...data,
        });

        return this.groupingsRepo.save(item);
    }

    async update(id: number, data: Partial<Groupings>) {
        const item = await this.groupingsRepo.findOneBy({ id });
        if (!item) {
            throw new NotFoundException(`Group dengan id ${id} tidak ditemukan`);
        }

        Object.assign(item, data);

        return await this.groupingsRepo.save(item);
    }

    async remove(id: number) {
        return this.groupingsRepo.delete(id);
    }
}
