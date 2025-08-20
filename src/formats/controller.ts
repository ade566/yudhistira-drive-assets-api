import { Controller, Get, Post, Put, Delete, Body, Query, Param, UseInterceptors, UploadedFile, ClassSerializerInterceptor } from '@nestjs/common';
import { FormatsService } from './service';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';
import { slug } from '../../utils/general';
import { NoFilesInterceptor } from '@nestjs/platform-express';

@Controller('formats')
export class FormatsController {
    constructor(private readonly formatsService: FormatsService) { }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    async getAll(@Query('limit') limitQuery: string) {
        const limit = limitQuery ? parseInt(limitQuery, 10) : undefined;
        return {
            statusCode: 200,
            message: 'Data format berhasil diambil',
            limit,
            data: await this.formatsService.findAll({
                limit
            })
        };
    }

    @Get('find/:id')
    async getOne(@Param('id') id: number) {
        return {
            statusCode: 200,
            message: 'Data format berhasil diambil',
            data: await this.formatsService.findOne(id)
        };
    }

    @Post('create')
    @UseInterceptors(NoFilesInterceptor())
    async create(@Body() dto: CreateDto) {
        try {
            return {
                statusCode: 200,
                message: 'format berhasil dibuat',
                data: await this.formatsService.create({
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
            const old = await this.formatsService.findOne(id);

            return {
                statusCode: 200,
                message: 'format berhasil diperbarui',
                data: await this.formatsService.update(id, {
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
                data: await this.formatsService.remove(id)
            };
        } catch (error) {
            throw error;
        }
    }
}
