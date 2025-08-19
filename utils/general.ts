import slugify from 'slugify';

export function slug(text: string) {
    return slugify(text ?? '', { lower: true, strict: true });
}