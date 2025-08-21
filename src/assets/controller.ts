import { Controller, Get, Post, Put, Delete, Body, Query, Param, UseInterceptors, Req, ClassSerializerInterceptor, UploadedFile, UploadedFiles } from '@nestjs/common';
import { AssetsService } from './service';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';
import { FileUpload, validateImageFile, joinPath, FileUploadFields, cleanupUploadedFiles } from '../../utils/file-upload.util';
import { slug } from '../../utils/general';
import { unlink } from 'fs/promises';
import type { UploadRequest } from '../../Interfaces/upload-request.interface';

@Controller('assets')
export class AssetsController {
    constructor(private readonly assetsService: AssetsService) { }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    async getAll(
        @Query('limit') limitQuery?: string,
        @Query('category_id') categoryIdQuery?: string,
        @Query('jenjang_id') jenjangIdQuery?: string,
        @Query('class_level_id') classLevelIdQuery?: string,
        @Query('page') pageQuery?: string,
        @Query('title') titleQuery?: string
    ) {
        const limit = limitQuery ? parseInt(limitQuery, 10) : undefined;
        const category_id = categoryIdQuery ? parseInt(categoryIdQuery, 10) : undefined;
        const jenjang_id = jenjangIdQuery ? parseInt(jenjangIdQuery, 10) : undefined;
        const class_level_id = classLevelIdQuery ? parseInt(classLevelIdQuery, 10) : undefined;
        const page = pageQuery ? parseInt(pageQuery, 10) : undefined;
        const title = titleQuery ?? undefined;

        const get_data = await this.assetsService.findAll({
            page,
            limit,
            category_id,
            jenjang_id,
            class_level_id,
            title
        })

        return {
            statusCode: 200,
            message: 'Data assets berhasil diambil',
            limit,
            ...get_data
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
    @UseInterceptors(
        FileUploadFields('assets', [
            { name: 'thumbnail', maxCount: 1, folder_path: 'thumbnail' },
            { name: 'contents', maxCount: 50, folder_path: 'contents' },
        ]),
    )
    async create(
        @Body() dto: CreateDto,
        @UploadedFiles()
        files: {
            thumbnail?: Express.Multer.File[];
            contents?: Express.Multer.File[];
        },
        @Req() req: UploadRequest
    ) {
        try {
            return {
                statusCode: 200,
                message: 'Asset berhasil dibuat',
                data: await this.assetsService.create({
                    ...dto,
                    slug: slug(dto.title ?? ''),
                    thumbnail: files.thumbnail?.[0]?.path.replace(/\\/g, '/'),
                }, files.contents)
            };
        } catch (error) {
            cleanupUploadedFiles(files);
            throw error;
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
                    await unlink(joinPath(old.thumbnail)).catch(() => { });
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
