import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { GroupingsModule } from './groupings/groupings.module';
import { ExtensionsModule } from './extensions/extensions.module';
import { FormatsModule } from './formats/formats.module';
import { JenjangsModule } from './jenjangs/jenjangs.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (config: ConfigService) => ({
				type: 'postgres',
				host: config.get<string>('DB_HOST'),
				port: config.get<number>('DB_PORT'),
				username: config.get<string>('DB_USERNAME'),
				password: config.get<string>('DB_PASSWORD'),
				database: config.get<string>('DB_NAME'),
				autoLoadEntities: true,
				synchronize: true,
			}),
		}),
		ServeStaticModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (config: ConfigService) => [
			  	{
					rootPath: join(config.get<string>('PATH_FILE') ?? '', 'uploads'),
					serveRoot: '/uploads',
				}
			],
		}),
		  
		UsersModule,
		AdminModule,
		AuthModule,
		CategoriesModule,
		GroupingsModule,
		ExtensionsModule,
		FormatsModule,
		JenjangsModule
	],
})
export class AppModule { }
