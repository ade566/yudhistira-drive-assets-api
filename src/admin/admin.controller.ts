import { Controller, Get, Post, Put, Delete, Body, Param, UseInterceptors, UploadedFile, ConflictException } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Admin } from './admin.entity';
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
                message: 'Success Create Admin',
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
                message: 'Success Update Admin',
                data: await this.adminService.update(id, dto),
            };
        } catch (error) {
            throw error;
        }
    }
}
