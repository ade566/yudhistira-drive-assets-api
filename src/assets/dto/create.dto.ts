import { IsInt, IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDto {
    
    @IsNotEmpty({ message: 'Judul tidak boleh kosong' })
    @IsString()
    title: string;

    @IsNotEmpty({ message: 'Deskripsi tidak boleh kosong' })
    @IsString()
    description: string;

    @IsNotEmpty({ message: 'Tahun tidak boleh kosong' })
    @IsString()
    year: string;

    @IsNotEmpty({ message: 'Tags tidak boleh kosong' })
    @IsString()
    tags: string;
    
    @Type(() => Number)
    @IsOptional()
    @IsInt()
    user_id?: number;

    @Type(() => Number)
    @IsNotEmpty({ message: 'Kategori tidak boleh kosong' })
    @IsInt()
    category_id: number;

    @Type(() => Number)
    @IsNotEmpty({ message: 'Ekstensi tidak boleh kosong' })
    @IsInt()
    extension_id: number;

    @Type(() => Number)
    @IsNotEmpty({ message: 'Format tidak boleh kosong' })
    @IsInt()
    format_id: number;

    @Type(() => Number)
    @IsNotEmpty({ message: 'Group tidak boleh kosong' })
    @IsInt()
    group_id: number;

    @Type(() => Number)
    @IsNotEmpty({ message: 'Jenjang tidak boleh kosong' })
    @IsInt()
    jenjang_id: number;

    @Type(() => Number)
    @IsNotEmpty({ message: 'Tingkat kelas tidak boleh kosong' })
    @IsInt()
    class_level_id: number;
}
