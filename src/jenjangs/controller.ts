import { Controller, Get, Post, Put, Delete, Body, Query, Param, UseInterceptors, UploadedFile, ClassSerializerInterceptor } from '@nestjs/common';
import { JenjangsService } from './service';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';
import { slug } from '../../utils/general';
import { NoFilesInterceptor } from '@nestjs/platform-express';

@Controller('jenjangs')
export class JenjangsController {
    constructor(private readonly jenjangsService: JenjangsService) { }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    async getAll(@Query('limit') limitQuery: string) {
        const limit = limitQuery ? parseInt(limitQuery, 10) : undefined;
        return {
            statusCode: 200,
            message: 'Data jenjang berhasil diambil',
            limit,
            data: await this.jenjangsService.findAll({
                limit
            })
        };
    }

    @Get('find/:id')
    async getOne(@Param('id') id: number) {
        return {
            statusCode: 200,
            message: 'Data jenjang berhasil diambil',
            data: await this.jenjangsService.findOne(id)
        };
    }

    @Post('create')
    @UseInterceptors(NoFilesInterceptor())
    async create(@Body() dto: CreateDto) {
        try {
            return {
                statusCode: 200,
                message: 'jenjang berhasil dibuat',
                data: await this.jenjangsService.create({
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
            const old = await this.jenjangsService.findOne(id);

            return {
                statusCode: 200,
                message: 'jenjang berhasil diperbarui',
                data: await this.jenjangsService.update(id, {
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
                message: 'jenjang berhasil dihapus',
                data: await this.jenjangsService.remove(id)
            };
        } catch (error) {
            throw error;
        }
    }
}
