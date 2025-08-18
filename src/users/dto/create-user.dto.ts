import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty({ message: 'Name tidak boleh kosong' })
    name: string;

    @IsEmail({}, { message: 'Format email tidak valid' })
    email: string;

    @IsNotEmpty({ message: 'Password tidak boleh kosong' })
    @MinLength(6, { message: 'Password minimal 6 karakter' })
    password: string;
}
