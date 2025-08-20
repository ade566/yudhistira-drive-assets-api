import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from './service';
import { AdminController } from './controller';
import { Admin } from './entity';

@Module({
    imports: [TypeOrmModule.forFeature([Admin])],
    controllers: [AdminController],
    providers: [AdminService],
})
export class AdminModule { }
