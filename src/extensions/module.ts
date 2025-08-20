import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExtensionsService } from './service';
import { ExtensionsController } from './controller';
import { Extensions } from './entity';

@Module({
    imports: [TypeOrmModule.forFeature([Extensions])],
    controllers: [ExtensionsController],
    providers: [ExtensionsService],
})
export class ExtensionsModule { }
