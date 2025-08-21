import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetsService } from './service';
import { AssetsController } from './controller';
import { Assets } from './entity';

@Module({
    imports: [TypeOrmModule.forFeature([Assets])],
    controllers: [AssetsController],
    providers: [AssetsService],
})
export class AssetsModule { }
