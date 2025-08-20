import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { AuthService } from './service';
import { NoFilesInterceptor } from '@nestjs/platform-express';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('user')
    @UseInterceptors(NoFilesInterceptor())
    async loginUser(@Body() dto: AuthDto) {
        return this.authService.loginUser(dto.email, dto.password);
    }

    @Post('admin')
    @UseInterceptors(NoFilesInterceptor())
    async loginAdmin(@Body() dto: AuthDto) {
        return this.authService.loginAdmin(dto.email, dto.password);
    }
}

