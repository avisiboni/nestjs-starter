import { ConfigService } from '@nestjs/config';
// import { createClient, RedisClientType } from 'redis';
import { redisStore } from 'cache-manager-ioredis-yet';
import { caching, createCache } from 'cache-manager';
import { CacheManagerModuleOptions } from './options/cache-options';
import { CacheType } from './options/cache-type';
import { Logger } from '@nestjs/common';

let cache = null;

export async function cacheFactory(configService: ConfigService) {
  const cacheConfiguration =
    configService.get<CacheManagerModuleOptions>('CACHE_CONFIG');
  if (cacheConfiguration?.type === CacheType.REDIS) {
    let isRedisConnected = false;

    try {
    } catch (error) {
      Logger.error(`Redis not connected due the ${error} `);
    } finally {
    }
    Logger.log('Is redis connected? ' + isRedisConnected);
    if (isRedisConnected) {
      if (cache) return cache;
      const redisConfig = {
        port: cacheConfiguration.port,
        host: cacheConfiguration.host,
        db: Number.isInteger(cacheConfiguration.database)
          ? cacheConfiguration.database
          : 0,
        username: cacheConfiguration.userName,
        password: cacheConfiguration.password,
        sentinelPassword: cacheConfiguration?.sentinels?.password,
        sentinelUsername: cacheConfiguration?.sentinels?.username,
        enableTLSForSentinelMode: cacheConfiguration?.sentinels?.enableTLS,
        enableReadyCheck: cacheConfiguration?.enableReadyCheck,
        keyPrefix: cacheConfiguration?.prefix,
        maxRetriesPerRequest: cacheConfiguration?.retries,
      };
      const cacheClient = await redisStore(redisConfig);
      cacheClient.client.on('error', (error) => {
        Logger.error('error while connecting to redis', { error });
      });
      cache = createCache(cacheClient);
      return cache;
    }

    Logger.warn('Could not connect to Redis, connecting to in memory cache ');

    return createMemoryCache();
  }
  Logger.warn('Please note, the cache type set to in memory cache');

  return createMemoryCache();
}

const createMemoryCache = () => caching('memory', { ttl: 600 });


