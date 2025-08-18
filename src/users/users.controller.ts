import { Controller, Get, Post, Put, Delete, Body, Param, UseInterceptors, UploadedFile, ConflictException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
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
                message: 'Success Create User',
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
                message: 'Success Update User',
                data: await this.usersService.update(id, dto),
            };
        } catch (error) {
            throw error;
        }
    }
}
