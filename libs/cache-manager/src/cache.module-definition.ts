import { ConfigurableModuleBuilder } from '@nestjs/common';

import { CacheManagerModuleOptions } from '@cache/cache-manager/options/cache-options';
export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<CacheManagerModuleOptions>().build();
