// Path: src/redis/factory/redis-client/redis-client.service.ts
// DESC: This is the main entry point for the redis-client application.
'use strict';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { MessageDTO } from './../../../common/dto';

// https://github.com/tulios/redisjs/tree/master/examples
// npm install --save ioredis
// npm install --save-dev @types/redis

@Injectable()
export class RedisClientService {
  private logger: Logger = new Logger(RedisClientService.name);
  // private readonly RedisServerUrl: string;
  private redis: Redis;
  private broker: string;
  private groupId: string;
  private topics: string[] = [];

  constructor(private readonly configService: ConfigService) {
    this.logger.log('Redis Client initialized');

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
    this.groupId = this.initializeRedisGroupId();
    this.topics = ['tasks'];
    this.logger.log('Redis consumer is running');

    this.consume(async (message) => {
      await this.logger.log(`Received message from Redis: ${JSON.stringify(message)}`);
    });
  }

  private initializeRedisServerUrl(): string {
    const REDIS_HOST: string =
      this.configService.get<string>('REDIS_HOST') || process.env.REDIS_HOST || 'localhost';
    const REDIS_PORT: number =
      this.configService.get<number>('REDIS_PORT') || Number(process.env.REDIS_PORT) || 9092;
    return `${REDIS_HOST}:${REDIS_PORT}`;
  }

  private initializeRedisGroupId(): string {
    const REDIS_GROUP_ID: string =
      this.configService.get<string>('REDIS_GROUP_ID') ||
      process.env.REDIS_GROUP_ID ||
      'redis-group';
    return REDIS_GROUP_ID;
  }

  async consume(handleMessage: (msg: MessageDTO) => void) {
    try {
      while (true) {
        const message = await this.redis.blpop(this.topics[0], 0);
        if (message && message[1]) {
          // this.logger.log("Received message from Redis: ", message);
          const rawMessage: MessageDTO = JSON.parse(message[1]);
          this.logger.log('Received message from Redis: ', {
            topic: this.topics[0],
            key: message[0],
            value: message[1],
          });
          handleMessage(rawMessage);
        }
      }
    } catch (error) {
      this.logger.error('Error consuming messages:', error);
      // Handle the error appropriately, e.g., reconnect, stop the consumer, etc.
    }
  }

  async disconnect(): Promise<void> {
    if (this.redis) {
      await this.redis.quit();
      this.logger.log('Redis client closed');
    }
  }
}
