import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ClassSerializerInterceptor } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
			exceptionFactory: (errors) => {
				// Ambil hanya pesan pertama dari error
				const messages = errors.map(
					(err) =>
						err.constraints ? Object.values(err.constraints)[0] : 'Invalid input', // handle undefined
				);
				return {
					message: messages.join(', '), // gabung jadi string
					error: 'Bad Request',
					statusCode: 400,
				};
			},
		}),
	);

	await app.listen(3000);
}
bootstrap();
