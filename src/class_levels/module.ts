import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassLevelsService } from './service';
import { ClassLevelsController } from './controller';
import { ClassLevels } from './entity';

@Module({
    imports: [TypeOrmModule.forFeature([ClassLevels])],
    controllers: [ClassLevelsController],
    providers: [ClassLevelsService],
})
export class ClassLevelsModule { }
