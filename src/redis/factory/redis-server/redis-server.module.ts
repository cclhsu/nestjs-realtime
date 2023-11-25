// Path: src/redis/factory/redis-server/redis-server.module.ts
// DESC: This is the main entry point for the redis-server application.
'use strict';
import { Module } from '@nestjs/common';
import { RedisServerController } from './redis-server.controller';
import { RedisServerService } from './redis-server.service';

@Module({
  imports: [],
  controllers: [RedisServerController],
  providers: [RedisServerService],
  exports: [RedisServerService],
})
export class RedisServerModule {}
