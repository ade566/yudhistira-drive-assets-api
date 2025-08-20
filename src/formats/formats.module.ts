import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormatsService } from './formats.service';
import { FormatsController } from './formats.controller';
import { Formats } from './formats.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Formats])],
    controllers: [FormatsController],
    providers: [FormatsService],
})
export class FormatsModule { }
