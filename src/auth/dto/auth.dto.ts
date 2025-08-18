import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class AuthDto {
    @IsNotEmpty({ message: 'Email tidak boleh kosong' })
    @IsEmail({}, { message: 'Format email tidak valid' })
    email: string;

    @IsNotEmpty({ message: 'Password tidak boleh kosong' })
    password: string;
}
