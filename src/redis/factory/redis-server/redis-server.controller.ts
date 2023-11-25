// Path: src/redis/factory/redis-server/redis-server.controller.ts
// DESC: This is the main entry point for the redis-server application.
'use strict';
import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RedisServerService } from './redis-server.service';
import { MessageDTO, MessageResponseDTO } from './../../../common/dto';

@ApiTags('redis')
@Controller('redis')
export class RedisServerController {
  private logger: Logger = new Logger(RedisServerController.name);
  constructor(private readonly redisServerService: RedisServerService) {}

  // @Post('create-topic')
  // async CreateTopic(): Promise<void> {
  //   await this.redisServerService.CreateTopic();
  // }

  // @Post('delete-topic')
  // async DeleteTopic(): Promise<void> {
  //   await this.redisServerService.DeleteTopic();
  // }

  // curl -s -X 'POST' -H 'accept: application/json' -H 'Content-Type: application/json' 'http://0.0.0.0:3001/redis/produce' -d '{ "UUID": "00000000-0000-0000-0000-000000000000", "type": 1, "stage": 0, "action": 0, "environment": 0, "sender": "00000000-0000-0000-0000-000000000000", "recipient": "00000000-0000-0000-0000-000000000000", "recipientType": 0, "recipients": [], "data": { "additionalProp1": {} }, "metadata": { "additionalProp1": {} } }' | jq
  // curl -s -X 'POST' -H 'accept: application/json' -H 'Content-Type: application/json' 'http://0.0.0.0:3001/redis/produce' -d '{ "UUID": "00000000-0000-0000-0000-000000000000", "type": 2, "stage": 0, "action": 0, "environment": 0, "sender": "00000000-0000-0000-0000-000000000000", "recipient": "00000000-0000-0000-0000-000000000000", "recipientType": 0, "recipients": [], "data": { "additionalProp1": {} }, "metadata": { "additionalProp1": {} } }' | jq
  // curl -s -X 'POST' -H 'accept: application/json' -H 'Content-Type: application/json' 'http://0.0.0.0:3001/redis/produce' -d '{ "UUID": "00000000-0000-0000-0000-000000000000", "type": 3, "stage": 0, "action": 0, "environment": 0, "sender": "13eca4f1-91ca-4ff9-bdd8-edb9cb63affd", "recipient": "00000000-0000-0000-0000-000000000000", "recipientType": 0, "recipients": [], "data": { "additionalProp1": {} }, "metadata": { "additionalProp1": {} } }' | jq
  @ApiOperation({ summary: 'Send a message to a websocket' })
  @ApiProduces('application/json')
  @ApiBody({
    description: 'Message Data',
    type: MessageDTO,
  })
  @ApiResponse({
    status: 200,
    description: 'Message Data Response',
    type: MessageResponseDTO,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    content: { 'application/json': {} },
  })
  @Post('produce')
  produce(@Body() message: MessageDTO): Promise<void> {
    this.logger.log(`Produce message: ${JSON.stringify(message)}`);
    return this.redisServerService.produce(message);
  }
}
