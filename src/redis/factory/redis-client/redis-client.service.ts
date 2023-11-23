// Path: src/redis/factory/redis-client/redis-client.service.ts
// DESC: This is the main entry point for the redis-client application.
'use strict';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisClientService {
  private logger: Logger = new Logger(RedisClientService.name);
  // private readonly RedisServerUrl: string;
  constructor(
    private readonly configService: ConfigService
  ) {
    this.logger.log('redis Client initialized');

    // Initialize redis server URL
    // this.RedisServerUrl = this.initializeRedisServerUrl();
    // this.logger.log(`redis Server URL: ${this.RedisServerUrl}`);

    // Register redis
    // const redisData: redisInfoDTO = {};

    // Initialize redis server URL
    // this.registerredis(redisData);
  }

  private initializeRedisServerUrl(): string {
    const SERVER_HOST: string =
      this.configService.get<string>('SERVER_HOST') ||
      process.env.SERVER_HOST ||
      this.configService.get<string>('SERVICE_HOST') ||
      'localhost';
    const SERVER_PORT: number =
      this.configService.get<number>('SERVER_PORT') ||
      Number(process.env.SERVER_PORT) ||
      this.configService.get<number>('SERVICE_PORT') ||
      3001;
    return `http://${SERVER_HOST}:${SERVER_PORT}/redis/`;
  }
}
