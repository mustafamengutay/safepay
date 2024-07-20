import { RedisClientType, createClient } from 'redis';

let redisClient: RedisClientType | null = null;

/**
 * Creates and starts a redis client. The client is used by calling `getRedisClient` function.
 * If there is a connection error, throws an error.
 */
export const createRedisClient = async () => {
  try {
    redisClient = createClient({
      url: process.env.REDIS_URI,
    });
    await redisClient.connect();
    console.log('Connected to Redis');
  } catch (error: any) {
    throw new Error('Redis client could not be created.');
  }
};

/**
 * Returns a client if the client was initialized successfully, otherwise, throws an error.
 * @returns A `Redis client` instance
 */
export const getRedisClient = (): RedisClientType => {
  if (!redisClient) {
    throw new Error('Redis Client not created');
  }

  return redisClient;
};
