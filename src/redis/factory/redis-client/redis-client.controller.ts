// Path: src/redis/factory/redis-client/redis-client.controller.ts
// DESC: This is the main entry point for the redis-client application.
'use strict';
import { Controller, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RedisClientService } from './redis-client.service';

@ApiTags('redis')
@Controller('redis')
export class RedisClientController {
  private logger: Logger = new Logger(RedisClientController.name);
  constructor(private readonly redisClientService: RedisClientService) {}
}
