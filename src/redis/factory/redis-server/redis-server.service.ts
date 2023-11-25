// Path: src/redis/factory/redis-server/redis-server.service.ts
// DESC: This is the main entry point for the redis-server application.
'use strict';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { MessageDTO } from './../../../common/dto';

// https://github.com/tulios/redisjs/tree/master/examples
// npm install --save ioredis
// npm install --save-dev @types/redis

@Injectable()
export class RedisServerService {
  private logger: Logger = new Logger(RedisServerService.name);
  private redis: Redis;
  private broker: string;
  private topics: string[] = [];

  constructor(private readonly configService: ConfigService) {
    this.logger.log('Redis Server initialized');
    this.broker = this.initializeRedisServerUrl();
    this.redis = new Redis({
      host: 'redis', // Redis server host
      port: 6379, // Redis server port
    });
    this.redis.on('connect', () => {
      this.logger.log('Redis server connected');
    });
    this.redis.on('ready', () => {
      this.logger.log('Redis server ready');
    });
    this.redis.on('error', (error) => {
      this.logger.error('Redis server error:', error);
    });
    this.redis.on('close', () => {
      this.logger.log('Redis server closed');
    });
    this.topics = ['tasks'];
    this.logger.log('Redis producer is running');
  }

  private initializeRedisServerUrl(): string {
    const REDIS_HOST: string =
      this.configService.get<string>('REDIS_HOST') || process.env.REDIS_HOST || 'localhost';
    const REDIS_PORT: number =
      this.configService.get<number>('REDIS_PORT') || Number(process.env.REDIS_PORT) || 9092;
    return `${REDIS_HOST}:${REDIS_PORT}`;
  }

  async produce(message: MessageDTO): Promise<void> {
    try {
      await this.redis.rpush(this.topics[0], JSON.stringify(message));
      this.logger.log('Sent message to Redis:', message);
    } catch (error) {
      this.logger.error('Error producing message:', error);
    }
    // } finally {
    //   await this.producer.disconnect();
    // }
  }

  async disconnect(): Promise<void> {
    if (this.redis) {
      await this.redis.quit();
      this.logger.log('Redis client closed');
    }
  }
}
