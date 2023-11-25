// Path: src/redis/factory/redis-client/redis-client.module.ts
// DESC: This is the main entry point for the redis-client application.
'use strict';
import { Module } from '@nestjs/common';
import { RedisClientController } from './redis-client.controller';
import { RedisClientService } from './redis-client.service';

@Module({
  imports: [],
  controllers: [RedisClientController],
  providers: [RedisClientService],
  exports: [RedisClientService],
})
export class RedisClientModule {}
