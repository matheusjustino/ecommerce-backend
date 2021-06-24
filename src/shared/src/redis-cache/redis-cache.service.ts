export const REDIS_CACHE_SERVICE = 'REDIS CACHE SERVICE';

export interface IRedisCacheInterface {
	save(key: string, value: any): Promise<void>;
	recover<T>(key: string): Promise<T | null>;
	invalidate(key: string): Promise<void>;
}
