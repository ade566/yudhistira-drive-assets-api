import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assets } from './entity';
import { CreateDto } from './dto/create.dto';

@Injectable()
export class AssetsService {
    constructor(
        @InjectRepository(Assets) private assetsRepo: Repository<Assets>,
    ) { }

    async findAll(options?: { limit?: number, category_id?: number, jenjang_id?: number, class_level_id?: number }) {
        const where: any = {};

        const relations = ['user', 'category']

        if (options?.category_id) {
            where.category = { id: options.category_id };
        }
        if (options?.jenjang_id) {
            where.jenjang = { id: options.jenjang_id };
        }
        if (options?.class_level_id) {
            where.classLevel = { id: options.class_level_id };
        }

        if (options?.limit && options.limit > 0) {
            return this.assetsRepo.find({ 
                where,
                relations,
                take: options.limit 
            });
        }
        return this.assetsRepo.find({ where, relations });
    }

    findOne(id: number) {
        return this.assetsRepo.findOne({ 
            where: { id },
            relations: ['user', 'category', 'extension', 'format', 'grouping', 'jenjang', 'classLevel'],
        });
    }

    async create(data: Partial<Assets>) {
        const item = this.assetsRepo.create({
            user: data.user_id ? { id: data.user_id } as any : undefined,
            category: data.category_id ? { id: data.category_id } as any : undefined,
            extension: data.extension_id ? { id: data.extension_id } as any : undefined,
            format: data.format_id ? { id: data.format_id } as any : undefined,
            grouping: data.group_id ? { id: data.group_id } as any : undefined,
            jenjang: data.jenjang_id ? { id: data.jenjang_id } as any : undefined,
            classLevel: data.class_level_id ? { id: data.class_level_id } as any : undefined,
            title: data.title,
            description: data.description,
            year: data.year,
            tags: data.tags,
            slug: data.slug,
            thumbnail: data.thumbnail,
        });

        return this.assetsRepo.save(item);
    }

    async update(id: number, data: Partial<Assets>) {
        const item = await this.assetsRepo.findOneBy({ id });
        if (!item) {
            throw new NotFoundException(`Asset dengan id ${id} tidak ditemukan`);
        }

        Object.assign(item, data);

        return await this.assetsRepo.save(item);
    }

    async remove(id: number) {
        return this.assetsRepo.delete(id);
    }
}
