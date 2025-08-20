import { Controller, Post, Put, Body, Param, UseInterceptors, ConflictException } from '@nestjs/common';
import { AdminService } from './service';
import { NoFilesInterceptor } from '@nestjs/platform-express';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    @Post('create')
    @UseInterceptors(NoFilesInterceptor())
    async create(@Body() dto: CreateDto) {
        try {
            return {
                statusCode: 200,
                message: 'Admin berhasil dibuat',
                data: await this.adminService.create(dto)
            };
        } catch (error) {
            if (error.code === '23505') {
                if (error.detail.includes('email')) {
                    throw new ConflictException('Email sudah digunakan');
                }
            }
            throw error;
        }
    }

    @Put('update/:id')
    @UseInterceptors(NoFilesInterceptor())
    async update(@Param('id') id: number, @Body() dto: UpdateDto) {
        try {
            return {
                statusCode: 200,
                message: 'Admin berhasil diperbarui',
                data: await this.adminService.update(id, dto),
            };
        } catch (error) {
            throw error;
        }
    }
}
