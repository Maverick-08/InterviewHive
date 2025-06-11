import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config(); 

const redisClient = new Redis({
  host: process.env.REDIS_HOST || '127.0.0.1', // Default to localhost if not set
  port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379, // Default port
  password: process.env.REDIS_PASSWORD || undefined, // Only include if Redis requires a password
  // Add any other Redis options if needed (e.g., enableTLS for SSL)
});

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
  console.error('Redis connection error:', err);
  // Optional: Implement reconnection logic or graceful shutdown here
});

export default redisClient;