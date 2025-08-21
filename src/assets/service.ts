import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assets } from './entity';
import { AssetContent } from './contents/entity';
import { DataSource } from 'typeorm';

@Injectable()
export class AssetsService {
    constructor(
        @InjectRepository(Assets) private assetsRepo: Repository<Assets>,
        @InjectRepository(AssetContent) private assetFilesRepo: Repository<AssetContent>,
        private readonly dataSource: DataSource
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

    async create(data: Partial<Assets>, contents?: Express.Multer.File[]) {
        return await this.dataSource.transaction(async (manager) => {
            const assetsRepo = manager.getRepository(Assets);
            const assetFilesRepo = manager.getRepository(AssetContent);
    
            const paramsData = {
                ...data,
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
            };
    
            const item = assetsRepo.create(paramsData);
            const savedAsset = await assetsRepo.save(item);
    
            let files: any[] = [];
    
            if (contents && contents.length > 0) {
                for (const file of contents) {
                    const save_content = await assetFilesRepo.save({
                        asset_id: savedAsset.id,
                        file: file.path.replace(/\\/g, '/'),
                        type: file.mimetype,
                        size: file.size ? Number(file.size) : 0,
                    });
                    files.push(save_content);
                }
            }
    
            return { ...savedAsset, files };
        });
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
