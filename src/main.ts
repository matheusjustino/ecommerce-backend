import 'module-alias/register';
import { configOptions } from './app-config/app-config-options';
require('dotenv').config({ path: configOptions.envFilePath });
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { CustomValidationPipe } from './common/pipes/custom-validation-pipe.pipe';
import { RateLimitInterceptor } from './common/interceptors/rate-limit.interceptor';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const configService = app.get(ConfigService);

	app.enableCors({
		origin: configService.get('FRONTEND_URL'),
		credentials: true,
	});

	app.use(helmet());
	app.useGlobalPipes(new CustomValidationPipe());
	app.useGlobalFilters(new HttpExceptionFilter());
	app.useGlobalInterceptors(
		new TimeoutInterceptor(),
		new RateLimitInterceptor(),
	);

	app.useGlobalPipes(new ValidationPipe());

	const config = new DocumentBuilder()
		.setTitle('Backend Ecommerce')
		.setDescription('API para gerencimento de Ecommerce.')
		.setVersion('1.0')
		.addTag('Ecommerce')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	await app.listen(3000);
}
bootstrap();
