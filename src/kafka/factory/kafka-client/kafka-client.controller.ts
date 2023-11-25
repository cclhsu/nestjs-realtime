// Path: src/kafka/factory/kafka-client/kafka-client.controller.ts
// DESC: This is the main entry point for the kafka-client application.
'use strict';
import { Controller, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { KafkaClientService } from './kafka-client.service';

@ApiTags('kafka')
@Controller('kafka')
export class KafkaClientController {
  private logger: Logger = new Logger(KafkaClientController.name);
  constructor(private readonly kafkaClientService: KafkaClientService) {
    // this.kafkaClientService.consume(async (message) => {
    //   await this.logger.log(`Received message from Kafka: ${JSON.stringify(message)}`);
    // });
  }
}
