// Path: src/app-factory/grpc/grpc.module.ts
// DESC: This is the main entry point for the grpc application.
'use strict';
import { CacheModule } from '@nestjs/cache-manager';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TerminusModule } from '@nestjs/terminus';
import type { RedisClientOptions } from 'redis';
// import { HealthModule } from '../../health/factory/restful/health.module';
import { HelloModule } from '../../hello/factory/restful/hello.module';
import { CsvModule } from '../../utils/csv/csv.module';
import { JsonModule } from '../../utils/json/json.module';
import { MarkdownModule } from '../../utils/markdown/markdown.module';
import { RequestLoggerMiddleware } from '../../utils/middleware/request-logger.middleware';
import { YamlModule } from '../../utils/yaml/yaml.module';
import { GrpcClientModule } from '../../grpc/factory/grpc-client/grpc-client.module';
// import { MetricsMiddleware } from '../../utils/middleware/metrics.middleware';

// import { JwtAuthStrategy as AuthStrategy } from '../../auth/strategies/jwt-auth.strategy';
// import { LocalAuthStrategy as AuthStrategy } from '../../auth/strategies/local-auth.strategy';
// import { validate } from '../../validation/env.validation';

@Module({
  imports: [
    JsonModule,
    YamlModule,
    CsvModule,
    MarkdownModule,
    // ConfigModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') },
      }),
      inject: [ConfigService],
    }),
    // CacheModule.register(),
    CacheModule.registerAsync<RedisClientOptions>({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        // store: redisStore,
        host: configService.get<string>('REDIS_HOST'),
        port: configService.get<number>('REDIS_PORT'),
        // ttl: 60000,
        ttl: configService.get('REDIS_TTL') | 60000,
      }),
      inject: [ConfigService],
    }),
    TerminusModule,
    HelloModule,
    // HealthModule,
    GrpcClientModule,
  ],
  controllers: [],
  providers: [
    /*AuthStrategy*/
  ],
})
export class GrpcClientServiceModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
    // consumer.apply(MetricsMiddleware).forRoutes({ path: 'metrics', method: RequestMethod.GET });
  }
}
