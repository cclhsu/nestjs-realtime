// Path: src/kafka/factory/kafka-server/kafka-server.controller.ts
// DESC: This is the main entry point for the kafka-server application.
'use strict';
import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { KafkaServerService } from './kafka-server.service';
import { MessageDTO, MessageResponseDTO } from './../../../common/dto';

@ApiTags('kafka')
@Controller('kafka')
export class KafkaServerController {
  private logger: Logger = new Logger(KafkaServerController.name);
  constructor(private readonly kafkaServerService: KafkaServerService) {}

  // @Post('create-topic')
  // async CreateTopic(): Promise<void> {
  //   await this.kafkaServerService.CreateTopic();
  // }

  // @Post('delete-topic')
  // async DeleteTopic(): Promise<void> {
  //   await this.kafkaServerService.DeleteTopic();
  // }

  // curl -s -X 'POST' -H 'accept: application/json' -H 'Content-Type: application/json' 'http://0.0.0.0:3001/kafka/produce' -d '{ "UUID": "00000000-0000-0000-0000-000000000000", "type": 1, "stage": 0, "action": 0, "environment": 0, "sender": "00000000-0000-0000-0000-000000000000", "recipient": "00000000-0000-0000-0000-000000000000", "recipientType": 0, "recipients": [], "data": { "additionalProp1": {} }, "metadata": { "additionalProp1": {} } }' | jq
  // curl -s -X 'POST' -H 'accept: application/json' -H 'Content-Type: application/json' 'http://0.0.0.0:3001/kafka/produce' -d '{ "UUID": "00000000-0000-0000-0000-000000000000", "type": 2, "stage": 0, "action": 0, "environment": 0, "sender": "00000000-0000-0000-0000-000000000000", "recipient": "00000000-0000-0000-0000-000000000000", "recipientType": 0, "recipients": [], "data": { "additionalProp1": {} }, "metadata": { "additionalProp1": {} } }' | jq
  // curl -s -X 'POST' -H 'accept: application/json' -H 'Content-Type: application/json' 'http://0.0.0.0:3001/kafka/produce' -d '{ "UUID": "00000000-0000-0000-0000-000000000000", "type": 3, "stage": 0, "action": 0, "environment": 0, "sender": "13eca4f1-91ca-4ff9-bdd8-edb9cb63affd", "recipient": "00000000-0000-0000-0000-000000000000", "recipientType": 0, "recipients": [], "data": { "additionalProp1": {} }, "metadata": { "additionalProp1": {} } }' | jq
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
    return this.kafkaServerService.produce(message);
  }
}
