import { IsNotEmpty, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDto {
    @IsNotEmpty({ message: 'Name tidak boleh kosong' })
    name: string;

    @Type(() => Number)
    @IsInt()
    jenjang_id: number;
}
