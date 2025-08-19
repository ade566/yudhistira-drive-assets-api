import { Controller, Get, Post, Put, Delete, Body, Param, UseInterceptors, UploadedFile, ConflictException } from '@nestjs/common';
import { UsersService } from './users.service';
import { NoFilesInterceptor } from '@nestjs/platform-express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post('create')
    @UseInterceptors(NoFilesInterceptor())
    async create(@Body() dto: CreateUserDto) {
        try {
            return {
                statusCode: 200,
                message: 'User berhasil dibuat',
                data: await this.usersService.create(dto)
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
    async update(@Param('id') id: number, @Body() dto: UpdateUserDto) {
        try {
            return {
                statusCode: 200,
                message: 'User berhasil diperbarui',
                data: await this.usersService.update(id, dto),
            };
        } catch (error) {
            throw error;
        }
    }
}
