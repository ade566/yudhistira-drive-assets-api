import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupingsService } from './groupings.service';
import { GroupingsController } from './groupings.controller';
import { Groupings } from './groupings.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Groupings])],
    controllers: [GroupingsController],
    providers: [GroupingsService],
})
export class GroupingsModule { }
