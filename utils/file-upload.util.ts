import { FileInterceptor } from '@nestjs/platform-express';
import { BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as path from 'path';

export function FileUpload(fieldName = 'file', folder: string) {
    return FileInterceptor(fieldName, {
        storage: diskStorage({
            destination: './uploads/' + folder,
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, uniqueSuffix + extname(file.originalname));
            },
        }),
    });
}

export function validateImageFile(file: Express.Multer.File, maxSizeMB: number, optional: boolean = false) {
    if (!optional) {
        if (!file) {
            throw new BadRequestException('File wajib diupload');
        }

        if (!file.mimetype.match(/^image\/(jpeg|jpg|png|gif)$/)) {
            throw new BadRequestException(
                'File harus berupa gambar (jpg, jpeg, png, gif)',
            );
        }

        if (file.size > maxSizeMB * 1024 * 1024) {
            throw new BadRequestException(`Ukuran file maksimal ${maxSizeMB}MB`);
        }
    }
}


export function joinPath(item_file: string) {
    return path.join(
        process.cwd(),
        item_file,
    );
}