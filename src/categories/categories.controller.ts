import { Controller, Get, Post, Put, Delete, Body, Param, UseInterceptors, UploadedFile, ConflictException } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { NoFilesInterceptor } from '@nestjs/platform-express';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) { }

    @Get()
    async getAll() {
        return {
            statusCode: 200,
            message: 'Data kategori berhasil diambil',
            data: await this.categoriesService.findAll()
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
    @UseInterceptors(NoFilesInterceptor())
    async create(@Body() dto: CreateDto) {
        try {
            return {
                statusCode: 200,
                message: 'Kategori berhasil dibuat',
                data: await this.categoriesService.create(dto)
            };
        } catch (error) {
            throw error;
        }
    }

    @Put('update/:id')
    @UseInterceptors(NoFilesInterceptor())
    async update(@Param('id') id: number, @Body() dto: UpdateDto) {
        try {
            return {
                statusCode: 200,
                message: 'Kategori berhasil diperbarui',
                data: await this.categoriesService.update(id, dto),
            };
        } catch (error) {
            throw error;
        }
    }

    @Delete('delete/:id')
    async remove(@Param('id') id: number) {
        return {
            statusCode: 200,
            message: 'Kategori berhasil dihapus',
            data: await this.categoriesService.remove(id)
        };
    }
}
