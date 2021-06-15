import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
	constructor(private readonly configService: ConfigService) {}

	public get databaseUrl(): string {
		return this.configService.get<string>('DATABASE_URL');
	}
}
