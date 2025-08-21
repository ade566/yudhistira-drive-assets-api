import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetsService } from './service';
import { AssetsController } from './controller';
import { Assets } from './entity';
import { AssetContent } from './contents/entity';

@Module({
    imports: [TypeOrmModule.forFeature([Assets, AssetContent])],
    controllers: [AssetsController],
    providers: [AssetsService],
})
export class AssetsModule { }
