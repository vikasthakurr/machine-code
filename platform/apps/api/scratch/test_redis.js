import Redis from 'ioredis';
import { env } from '../src/config/env.js';

async function testRedis() {
  const redis = new Redis(env.REDIS_URL);
  try {
    const res = await redis.ping();
    console.log('Redis Ping Response:', res);
    if (res === 'PONG') {
      console.log('Redis is WORKING!');
    }
    await redis.quit();
  } catch (err) {
    console.error('Redis Connection Failed:', err);
  }
}

testRedis();
