import { Controller, Get, Post, Put, Query, Body, Param, UseInterceptors, UploadedFile, ConflictException, ClassSerializerInterceptor } from '@nestjs/common';
import { UsersService } from './service';
import { NoFilesInterceptor } from '@nestjs/platform-express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileUpload, validateImageFile, joinPath } from '../../utils/file-upload.util';
import { unlink } from 'fs/promises';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    async getAll(@Query('limit') limitQuery: string) {
        const limit = limitQuery ? parseInt(limitQuery, 10) : undefined;
        return {
            statusCode: 200,
            message: 'Data User berhasil diambil',
            limit,
            data: await this.usersService.findAll({
                limit
            })
        };
    }

    @Post('create')
    @UseInterceptors(FileUpload('file', 'avatar'))
    async create(
        @Body() dto: CreateUserDto,
        @UploadedFile() file: Express.Multer.File,
    ) {
        try {
            validateImageFile(file, 1);

            return {
                statusCode: 200,
                message: 'User berhasil dibuat',
                data: await this.usersService.create({
                    ...dto,
                    avatar: 'uploads/categories/' + file?.filename,
                })
            };
        } catch (error) {
            if (file?.path) {
                await unlink(file.path).catch(() => {});
            }

            if (error.code === '23505') {
                if (error.detail.includes('email')) {
                    throw new ConflictException('Email sudah digunakan');
                }
            }
            throw error;
        }
    }

    @Put('update/:id')
    @UseInterceptors(FileUpload('file', 'avatar'))
    async update(
        @Param('id') id: number, 
        @Body() dto: UpdateUserDto,
        @UploadedFile() file: Express.Multer.File
    ) {
        try {
            const old = await this.usersService.findOne(id);

            if (file) {
                validateImageFile(file, 2);
          
                if (old?.avatar) {
                    await unlink(joinPath(old.avatar)).catch(() => {});
                }
            }

            return {
                statusCode: 200,
                message: 'User berhasil diperbarui',
                data: await this.usersService.update(id, {
                    ...dto,
                    avatar: file ? 'uploads/avatar/' + file.filename : old?.avatar,
                }),
            };
        } catch (error) {
            if (file?.path) {
                await unlink(file.path).catch(() => {});
            }

            if (error.code === '23505') {
                if (error.detail.includes('email')) {
                    throw new ConflictException('Email sudah digunakan');
                }
            }

            throw error;
        }
    }
}
