import { Module, Scope } from '@nestjs/common';
import { ConfigurableModuleClass } from './cache.module-definition';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { cacheFactory } from '@cache/cache-manager/cache-factory';
@Module({
  providers: [
    {
      provide: CACHE_MANAGER,
      useFactory: cacheFactory,
      inject: [ConfigService],
      scope: Scope.REQUEST,
    },
  ],
  exports: [
    {
      provide: CACHE_MANAGER,
      useFactory: cacheFactory,
      inject: [ConfigService],
      scope: Scope.DEFAULT,
    },
  ],
})
export class CacheManagerModule extends ConfigurableModuleClass {}
