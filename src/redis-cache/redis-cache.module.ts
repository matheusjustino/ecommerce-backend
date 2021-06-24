import { Module } from '@nestjs/common';

import { AppConfigModule } from '@src/app-config/app-config.module';
import { RedisCacheService } from './redis-cache.service';

// SERVICES INTERFACE
import { REDIS_CACHE_SERVICE } from '@shared/src/redis-cache/redis-cache.service';

@Module({
	imports: [AppConfigModule],
	providers: [
		{
			useClass: RedisCacheService,
			provide: REDIS_CACHE_SERVICE,
		},
	],
	exports: [
		{
			useClass: RedisCacheService,
			provide: REDIS_CACHE_SERVICE,
		},
	],
})
export class RedisCacheModule {}
