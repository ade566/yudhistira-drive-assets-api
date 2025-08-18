import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: '127.0.0.1',
			port: 5432,
			username: 'postgres',
			password: '',
			database: 'drive_assets',
			autoLoadEntities: true,
			synchronize: true,
		}),
		UsersModule, 
		AdminModule,
		AuthModule
	],
})
export class AppModule { }
