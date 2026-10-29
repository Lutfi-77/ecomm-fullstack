import { Redis } from 'ioredis';
import dotenv from 'dotenv';
dotenv.config();

const REDIS_HOST = process.env.REDIS_HOST || '100.89.3.102'; // atau localhost
const REDIS_PORT = Number(process.env.REDIS_PORT) || 6379;

export const redis = new Redis({
  port: REDIS_PORT,
  host: REDIS_HOST,
});

redis.on('connect', () => {
  console.log('Connected to Redis in user-service ⚡');
});

redis.on('error', (err) => {
  console.error('Redis connection error in user-service:', err);
});
