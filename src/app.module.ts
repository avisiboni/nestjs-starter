import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { CacheManagerModule, CacheType } from '@cache/cache-manager';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import vaultConfig from './core/database/config/vault.config';

@Module({
  imports: [
    UsersModule,
    // CacheManagerModule.register({
    //   type: CacheType.IN_MEMORY,
    //   prefix: 'test',
    // }),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [async () => await vaultConfig()],
    }),

    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          uri: await configService.get('DB_CONNECTION_STRING'),
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
