// Path: src/redis/factory/redis-client/redis-client.module.ts
// DESC: This is the main entry point for the redis-client application.
'use strict';
import { Module } from '@nestjs/common';
import { RedisClientService } from './redis-client.service';

@Module({
  imports: [],
  controllers: [],
  providers: [RedisClientService],
  exports: [RedisClientService],
})
export class RedisClientModule {}
