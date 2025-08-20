import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JenjangsService } from './jenjangs.service';
import { JenjangsController } from './jenjangs.controller';
import { Jenjangs } from './jenjangs.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Jenjangs])],
    controllers: [JenjangsController],
    providers: [JenjangsService],
})
export class JenjangsModule { }
