import { Controller, Get, Post, Put, Delete, Body, Query, Param, UseInterceptors, UploadedFile, ClassSerializerInterceptor } from '@nestjs/common';
import { GroupingsService } from './groupings.service';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';
import { slug } from '../../utils/general';
import { NoFilesInterceptor } from '@nestjs/platform-express';

@Controller('groupings')
export class GroupingsController {
    constructor(private readonly groupingsService: GroupingsService) { }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    async getAll(@Query('limit') limitQuery: string) {
        const limit = limitQuery ? parseInt(limitQuery, 10) : undefined;
        return {
            statusCode: 200,
            message: 'Data group berhasil diambil',
            limit,
            data: await this.groupingsService.findAll({
                limit
            })
        };
    }

    @Get('find/:id')
    async getOne(@Param('id') id: number) {
        return {
            statusCode: 200,
            message: 'Data group berhasil diambil',
            data: await this.groupingsService.findOne(id)
        };
    }

    @Post('create')
    @UseInterceptors(NoFilesInterceptor())
    async create(@Body() dto: CreateDto) {
        try {
            return {
                statusCode: 200,
                message: 'Group berhasil dibuat',
                data: await this.groupingsService.create({
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
            const old = await this.groupingsService.findOne(id);

            return {
                statusCode: 200,
                message: 'Group berhasil diperbarui',
                data: await this.groupingsService.update(id, {
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
                message: 'Group berhasil dihapus',
                data: await this.groupingsService.remove(id)
            };
        } catch (error) {
            throw error;
        }
    }
}
