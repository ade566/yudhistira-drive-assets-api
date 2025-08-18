import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '../users/user.entity';
import { Admin } from '../admin/admin.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Admin]), // ✅ inject repository di sini
        JwtModule.register({
            secret: 'b7f8e2c1a9d4f6e3b2c7a1e8d5f4c3b6', // sebaiknya pakai .env
            signOptions: { expiresIn: '1h' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService], // kalau mau dipakai module lain
})
export class AuthModule { }
