import { Request } from 'express';

export interface UploadRequest extends Request {
    uploadFolder?: string;
}