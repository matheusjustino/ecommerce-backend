import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
	constructor(private readonly configService: ConfigService) {}

	public get databaseUrl(): string {
		return this.configService.get<string>('DATABASE_URL');
	}

	public get secret(): string {
		return this.configService.get<string>('SECRET');
	}

	public get stripeSecretKey(): string {
		return this.configService.get<string>('STRIPE_SECRET_KEY');
	}

	public get stripeCurrency(): string {
		return this.configService.get<string>('STRIPE_CURRENCY');
	}

	public get frontendUrl(): string {
		return this.configService.get<string>('FRONTEND_URL');
	}

	public get mailCompanyName(): string {
		return this.configService.get<string>('MAIL_COMPANY_NAME');
	}

	public get mailCompanyEmail(): string {
		return this.configService.get<string>('MAIL_COMPANY_EMAIL');
	}

	public get mailHost(): string {
		return this.configService.get<string>('MAIL_HOST');
	}

	public get mailPort(): number {
		return this.configService.get<number>('MAIL_PORT');
	}

	public get mailUser(): string {
		return this.configService.get<string>('MAIL_AUTH_USER');
	}

	public get mailPass(): string {
		return this.configService.get<string>('MAIL_AUTH_PASS');
	}
}
