import { redis } from './RedisClient';

export class RedisService {
  async get<T>(key: string): Promise<T | null> {
    try {
      const data = await redis.get(key);
      if (!data) return null;
      return JSON.parse(data);
    } catch (e) {
      return null;
    }
  }

  async set(key: string, value: any): Promise<void> {
    try {
      await redis.set(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Error setting cache key: ${key}`, e);
    }
  }

  async del(key: string) {
    try {
      await redis.del(key);
    } catch (e) {
      console.error(`Error deleting cache key: ${key}`, e);
    }
  }
}
