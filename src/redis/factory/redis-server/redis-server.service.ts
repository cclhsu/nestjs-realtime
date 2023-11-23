// Path: src/redis/factory/redis-server/redis-server.service.ts
// DESC: This is the main entry point for the redis-server application.
'use strict';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisServerService {
  private logger: Logger = new Logger(RedisServerService.name);
  constructor(
    private readonly configService: ConfigService
  ) {
    this.logger.log('redis Server initialized');
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
