// Path: src/redis/factory/redis-server/redis-server.module.ts
// DESC: This is the main entry point for the redis-server application.
'use strict';
import { Module } from '@nestjs/common';
import { RedisServerService } from './redis-server.service';

@Module({
  imports: [],
  controllers: [],
  providers: [RedisServerService],
  exports: [RedisServerService],
})
export class RedisServerModule {}
