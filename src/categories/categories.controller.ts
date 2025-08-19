import { Controller, Get, Post, Put, Delete, Body, Query, Param, UseInterceptors, UploadedFile, ClassSerializerInterceptor } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';
import { FileUpload, validateImageFile, joinPath } from '../../utils/file-upload.util';
import { slug } from '../../utils/general';
import { unlink } from 'fs/promises';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) { }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    async getAll(@Query('limit') limitQuery: string) {
        const limit = limitQuery ? parseInt(limitQuery, 10) : undefined;
        return {
            statusCode: 200,
            message: 'Data kategori berhasil diambil',
            limit,
            data: await this.categoriesService.findAll({
                limit
            })
        };
    }

    @Get('find/:id')
    async getOne(@Param('id') id: number) {
        return {
            statusCode: 200,
            message: 'Data kategori berhasil diambil',
            data: await this.categoriesService.findOne(id)
        };
    }

    @Post('create')
    @UseInterceptors(FileUpload('file', 'categories'))
    async create(
        @Body() dto: CreateDto,
        @UploadedFile() file: Express.Multer.File,
    ) {
        try {
            validateImageFile(file, 2);
       
            return {
                statusCode: 200,
                message: 'Kategori berhasil dibuat',
                data: await this.categoriesService.create({
                    ...dto,
                    slug: slug(dto.name ?? ''),
                    file: 'uploads/categories/' + file?.filename,
                }),
            };

        } catch (err) {
            if (file?.path) {
                await unlink(file.path);
            }
            throw err;
        }
    }

    @Put('update/:id')
    @UseInterceptors(FileUpload('file', 'categories'))
    async update(
        @Param('id') id: number, 
        @Body() dto: UpdateDto,
        @UploadedFile() file: Express.Multer.File
    ) {
        try {
            validateImageFile(file, 2, true);
            
            const old = await this.categoriesService.findOne(id);

            if (file) {
                validateImageFile(file, 2);
          
                if (old?.file) {
                    await unlink(joinPath('categories', old.file));
                }
              }

            return {
                statusCode: 200,
                message: 'Kategori berhasil diperbarui',
                data: await this.categoriesService.update(id, {
                    ...dto,
                    slug: slug(dto.name ?? ''),
                    file: file ? 'uploads/categories/' + file.filename : old?.file,
                }),
            };
        } catch (error) {
            if (file?.path) {
                await unlink(file.path);
            }
            throw error;
        }
    }

    @Delete('delete/:id')
    async remove(@Param('id') id: number) {
        try {
            const old = await this.categoriesService.findOne(id);

            if (old?.file) {
                await unlink(joinPath('categories', old.file));
            }

            return {
                statusCode: 200,
                message: 'Kategori berhasil dihapus',
                data: await this.categoriesService.remove(id)
            };
        } catch (error) {
            throw error;
        }
    }
}
