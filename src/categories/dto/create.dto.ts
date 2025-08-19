import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateDto {
    @IsNotEmpty({ message: 'Name tidak boleh kosong' })
    name: string;
}
