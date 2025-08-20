import { Controller, Get, Post, Put, Delete, Body, Query, Param, UseInterceptors, UploadedFile, ClassSerializerInterceptor } from '@nestjs/common';
import { ClassLevelsService } from './service';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';
import { slug } from '../../utils/general';
import { NoFilesInterceptor } from '@nestjs/platform-express';

@Controller('class-levels')
export class ClassLevelsController {
    constructor(private readonly classLevelsService: ClassLevelsService) { }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    async getAll(
        @Query('limit') limitQuery: string,
        @Query('jenjang_id') jenjangIdQuery?: string
    ) {
        
        const limit = limitQuery ? parseInt(limitQuery, 10) : undefined;
        const jenjang_id = jenjangIdQuery ? parseInt(jenjangIdQuery, 10) : undefined;

        return {
            statusCode: 200,
            message: 'Data kelas berhasil diambil',
            limit,
            jenjang_id,
            data: await this.classLevelsService.findAll({
                limit,
                jenjang_id
            })
        };
    }

    @Get('find/:id')
    async getOne(@Param('id') id: number) {
        return {
            statusCode: 200,
            message: 'Data kelas berhasil diambil',
            data: await this.classLevelsService.findOne(id)
        };
    }

    @Post('create')
    @UseInterceptors(NoFilesInterceptor())
    async create(@Body() dto: CreateDto) {
        try {
            return {
                statusCode: 200,
                message: 'kelas berhasil dibuat',
                data: await this.classLevelsService.create(dto),
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
            const old = await this.classLevelsService.findOne(id);

            return {
                statusCode: 200,
                message: 'kelas berhasil diperbarui',
                data: await this.classLevelsService.update(id, {
                    ...dto,
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
                message: 'kelas berhasil dihapus',
                data: await this.classLevelsService.remove(id)
            };
        } catch (error) {
            throw error;
        }
    }
}
