import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupingsService } from './service';
import { GroupingsController } from './controller';
import { Groupings } from './entity';

@Module({
    imports: [TypeOrmModule.forFeature([Groupings])],
    controllers: [GroupingsController],
    providers: [GroupingsService],
})
export class GroupingsModule { }
