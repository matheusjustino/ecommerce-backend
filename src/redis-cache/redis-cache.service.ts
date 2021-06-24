import { Injectable } from '@nestjs/common';
import Redis, { Redis as RedisClient } from 'ioredis';

// SERVICES
import { AppConfigService } from '@src/app-config/app-config.service';

// SERVICES INTERFACE
import { IRedisCacheInterface } from '@shared/src/redis-cache/redis-cache.service';

@Injectable()
export class RedisCacheService implements IRedisCacheInterface {
	private client: RedisClient;

	constructor(private readonly appConfigService: AppConfigService) {
		if (!this.client) {
			this.client = new Redis({
				host: this.appConfigService.redisHost,
				port: this.appConfigService.redisPort,
				password: this.appConfigService.redisPassword,
			});
		}
	}

	public async save(key: string, value: any): Promise<void> {
		await this.client.set(key, JSON.stringify(value), 'ex', 3600);
	}

	public async recover<T>(key: string): Promise<T | null> {
		const data = await this.client.get(key);

		if (!data) {
			return null;
		}

		const parsedData = JSON.parse(data) as T;
		return parsedData;
	}

	public async invalidate(key: string): Promise<void> {
		await this.client.del(key);
	}
}
