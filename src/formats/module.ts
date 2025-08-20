import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormatsService } from './service';
import { FormatsController } from './controller';
import { Formats } from './entity';

@Module({
    imports: [TypeOrmModule.forFeature([Formats])],
    controllers: [FormatsController],
    providers: [FormatsService],
})
export class FormatsModule { }
