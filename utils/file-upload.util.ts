import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as path from 'path';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { UploadRequest } from '../Interfaces/upload-request.interface';

interface UploadField {
    name: string;
    maxCount?: number;
    folder?: string;
}
export function FileUploadFields(prefix_folder: string, fields: { name: string; folder_path: string; maxCount?: number }[]) {
    return FileFieldsInterceptor(
        fields,
        {
            storage: diskStorage({
                destination: (req: UploadRequest, file, cb) => {
                    if (!req.uploadFolder) {
                        req.uploadFolder = uuidv4();
                    }

                    const folder = req.uploadFolder;
                    let subfolder = fields.find(f => f.name === file.fieldname)?.folder_path || '';

                    const uploadPath = `./uploads/${prefix_folder}/${folder}/${subfolder}`;
                    if (!fs.existsSync(uploadPath)) {
                        fs.mkdirSync(uploadPath, { recursive: true });
                    }
                    cb(null, uploadPath);
                },
                filename: (req, file, cb) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    cb(null, uniqueSuffix + extname(file.originalname));
                },
            }),
        },
    );
}

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

export function cleanupUploadedFiles(files: { [field: string]: Express.Multer.File[] }) {
    if (!files) return;

    Object.values(files).forEach((fileArray) => {
        if (fileArray && fileArray.length > 0) {
            fileArray.forEach((file) => {
                try {
                    fs.unlinkSync(path.resolve(file.path)); // hapus file
                } catch (err) {
                    console.error(`Failed to delete file: ${file.path}`, err);
                }
            });
        }
    });
}