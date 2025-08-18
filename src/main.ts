import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

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

	await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
