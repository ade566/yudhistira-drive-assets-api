import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JenjangsService } from './service';
import { JenjangsController } from './controller';
import { Jenjangs } from './entity';

@Module({
    imports: [TypeOrmModule.forFeature([Jenjangs])],
    controllers: [JenjangsController],
    providers: [JenjangsService],
})
export class JenjangsModule { }
