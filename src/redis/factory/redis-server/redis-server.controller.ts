// Path: src/redis/factory/redis-server/redis-server.controller.ts
// DESC: This is the main entry point for the redis-server application.
'use strict';
import { Controller, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RedisServerService } from './redis-server.service';

@ApiTags('redis')
@Controller('redis')
export class RedisServerController {
  private logger: Logger = new Logger(RedisServerController.name);
  constructor(private readonly redisServerService: RedisServerService) {}
}
