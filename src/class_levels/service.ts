import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClassLevels } from './entity';
import { CreateDto } from './dto/create.dto';

@Injectable()
export class ClassLevelsService {
    constructor(
        @InjectRepository(ClassLevels) private classLevelsRepo: Repository<ClassLevels>,
    ) { }

    async findAll(options?: { limit?: number, jenjang_id?: number, all?: boolean }) {
        const where: any = {};

        if (options?.jenjang_id) {
            where.jenjang = { id: options.jenjang_id };
        }

        if (options?.limit && options.limit > 0) {
            return this.classLevelsRepo.find({ 
                where,
                take: options.limit 
            });
        }
        return this.classLevelsRepo.find({ where });
    }

    findOne(id: number) {
        return this.classLevelsRepo.findOne({ 
            where: { id },
            relations: ['jenjang'],
        });
    }

    async create(data: CreateDto) {
        const item = this.classLevelsRepo.create({
            name: data.name,
            jenjang: { id: data.jenjang_id }
        });

        return this.classLevelsRepo.save(item);
    }

    async update(id: number, data: Partial<ClassLevels>) {
        const item = await this.classLevelsRepo.findOneBy({ id });
        if (!item) {
            throw new NotFoundException(`Kelas dengan id ${id} tidak ditemukan`);
        }

        Object.assign(item, data);

        return await this.classLevelsRepo.save(item);
    }

    async remove(id: number) {
        return this.classLevelsRepo.delete(id);
    }
}
