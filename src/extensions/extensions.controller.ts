import { Controller, Get, Post, Put, Delete, Body, Query, Param, UseInterceptors, UploadedFile, ClassSerializerInterceptor } from '@nestjs/common';
import { ExtensionsService } from './extensions.service';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';
import { slug } from '../../utils/general';
import { NoFilesInterceptor } from '@nestjs/platform-express';

@Controller('extensions')
export class ExtensionsController {
    constructor(private readonly extensionsService: ExtensionsService) { }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    async getAll(@Query('limit') limitQuery: string) {
        const limit = limitQuery ? parseInt(limitQuery, 10) : undefined;
        return {
            statusCode: 200,
            message: 'Data ekstensi berhasil diambil',
            limit,
            data: await this.extensionsService.findAll({
                limit
            })
        };
    }

    @Get('find/:id')
    async getOne(@Param('id') id: number) {
        return {
            statusCode: 200,
            message: 'Data ekstensi berhasil diambil',
            data: await this.extensionsService.findOne(id)
        };
    }

    @Post('create')
    @UseInterceptors(NoFilesInterceptor())
    async create(@Body() dto: CreateDto) {
        try {
            return {
                statusCode: 200,
                message: 'ekstensi berhasil dibuat',
                data: await this.extensionsService.create({
                    ...dto,
                    slug: slug(dto.name ?? '')
                }),
            };

        } catch (err) {
            throw err;
        }
    }

    @Put('update/:id')
    @UseInterceptors(NoFilesInterceptor())
    async update(
        @Param('id') id: number, 
        @Body() dto: UpdateDto
    ) {
        try {
            const old = await this.extensionsService.findOne(id);

            return {
                statusCode: 200,
                message: 'ekstensi berhasil diperbarui',
                data: await this.extensionsService.update(id, {
                    ...dto,
                    slug: slug(dto.name ?? '')
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
                message: 'ekstensi berhasil dihapus',
                data: await this.extensionsService.remove(id)
            };
        } catch (error) {
            throw error;
        }
    }
}
