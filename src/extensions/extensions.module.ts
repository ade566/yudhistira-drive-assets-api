import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExtensionsService } from './extensions.service';
import { ExtensionsController } from './extensions.controller';
import { Extensions } from './extensions.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Extensions])],
    controllers: [ExtensionsController],
    providers: [ExtensionsService],
})
export class ExtensionsModule { }
