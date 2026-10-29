import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

export const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://100.89.3.102:6379',
});

redisClient.on('error', (err) => {
  console.log('Redis client error ', err);
});

redisClient.on('connect', () => {
  console.log('Connected to Redis for Rate Limiting 🚀');
});

export async function connectRedis() {
  // if (!redisClient.isOpen) {
  //   await redisClient.connect();
  // }
  try {
    await redisClient.connect();
  } catch (e) {
    console.error('Redis trying to connect in 5 seconds');
    setTimeout(connectRedis, 5000);
  }
}

connectRedis();

process.on('SIGINT', async () => await redisClient.disconnect());
