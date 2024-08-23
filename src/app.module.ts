import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { HttpModule } from './http/http.module';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './infra/database/database.module';

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        store: typeof redisStore,
        isGlobal: true,
        host: config.getOrThrow('REDIS_HOST'),
        port: config.getOrThrow('REDIS_PORT'),
        ttl: Number(config.get('REDIS_TTL', 0)),
      }),
    }),
    DatabaseModule,
    HttpModule,
  ],
})
export class AppModule {}
