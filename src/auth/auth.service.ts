import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from '../admin/admin.entity';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @InjectRepository(Admin)
        private adminsRepository: Repository<Admin>,
        private jwtService: JwtService,
    ) { }

    // login user
    async loginUser(email: string, password: string) {
        const user = await this.usersRepository.findOne({ where: { email } });
        if (!user) throw new UnauthorizedException('Email atau password salah');

        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new UnauthorizedException('Email atau password salah');

        const payload = { sub: user.id, email: user.email, role: 'user' };

        user.password = 'PASSWORD_NOT_DISPLAYED'

        return { 
            access_token: this.jwtService.sign(payload), 
            role: 'user',
            statusCode: 200,
            data: user
        };
    }

    // login admin
    async loginAdmin(email: string, password: string) {
        const admin = await this.adminsRepository.findOne({ where: { email } });
        if (!admin) throw new UnauthorizedException('Email atau password salah');

        const match = await bcrypt.compare(password, admin.password);
        if (!match) throw new UnauthorizedException('Email atau password salah');

        const payload = { sub: admin.id, email: admin.email, role: 'admin' };

        admin.password = 'PASSWORD_NOT_DISPLAYED'

        return {
            access_token: this.jwtService.sign(payload), 
            role: 'admin',
            statusCode: 200,
            data: admin
        };
    }
}

