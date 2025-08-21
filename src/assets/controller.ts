import { Controller, Get, Post, Put, Delete, Body, Query, Param, UseInterceptors, ClassSerializerInterceptor, UploadedFile } from '@nestjs/common';
import { AssetsService } from './service';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';
import { FileUpload, validateImageFile, joinPath } from '../../utils/file-upload.util';
import { slug } from '../../utils/general';
import { unlink } from 'fs/promises';

@Controller('assets')
export class AssetsController {
    constructor(private readonly assetsService: AssetsService) { }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    async getAll(
        @Query('limit') limitQuery?: string,
        @Query('category_id') categoryIdQuery?: string,
        @Query('jenjang_id') jenjangIdQuery?: string,
        @Query('class_level_id') classLevelIdQuery?: string
    ) {
        const limit = limitQuery ? parseInt(limitQuery, 10) : undefined;
        const category_id = categoryIdQuery ? parseInt(categoryIdQuery, 10) : undefined;
        const jenjang_id = jenjangIdQuery ? parseInt(jenjangIdQuery, 10) : undefined;
        const class_level_id = classLevelIdQuery ? parseInt(classLevelIdQuery, 10) : undefined;

        return {
            statusCode: 200,
            message: 'Data assets berhasil diambil',
            limit,
            data: await this.assetsService.findAll({
                limit,
                category_id,
                jenjang_id,
                class_level_id
            })
        };
    }

    @Get('find/:id')
    async getOne(@Param('id') id: number) {
        const item = await this.assetsService.findOne(id);

        if (!item) {
            return {
                statusCode: 404,
                message: 'Asset tidak ditemukan',
            };
        }

        return {
            statusCode: 200,
            message: 'Data asset berhasil diambil',
            data: item
        };
    }

    @Post('create')
    @UseInterceptors(FileUpload('thumbnail', 'thumbnail'))
    async create(
        @Body() dto: CreateDto,
        @UploadedFile() thumbnail: Express.Multer.File
    ) {
        try {
            return {
                statusCode: 200,
                message: 'Asset berhasil dibuat',
                data: await this.assetsService.create({
                    ...dto,
                    slug: slug(dto.title ?? ''),
                    thumbnail: 'uploads/thumbnail/' + thumbnail?.filename,
                }),
            };
        } catch (err) {
            throw err;
        }
    }

    @Put('update/:id')
    @UseInterceptors(FileUpload('thumbnail', 'thumbnail'))
    async update(
        @Param('id') id: number,
        @Body() dto: UpdateDto,
        @UploadedFile() thumbnail: Express.Multer.File
    ) {
        try {
            const old = await this.assetsService.findOne(id);

            if (thumbnail) {
                validateImageFile(thumbnail, 2);
          
                if (old?.thumbnail) {
                    await unlink(joinPath(old.thumbnail)).catch(() => {});
                }
            }

            return {
                statusCode: 200,
                message: 'Asset berhasil diperbarui',
                data: await this.assetsService.update(id, {
                    ...dto,
                    slug: slug(dto.title ?? ''),
                    thumbnail: thumbnail ? 'uploads/thumbnail/' + thumbnail.filename : old?.thumbnail,
                }),
            };
        } catch (error) {
            throw error;
        }
    }

    @Delete('delete/:id')
    async remove(@Param('id') id: number) {
        try {
            return {
                statusCode: 200,
                message: 'Asset berhasil dihapus',
                data: await this.assetsService.remove(id)
            };
        } catch (error) {
            throw error;
        }
    }
}
