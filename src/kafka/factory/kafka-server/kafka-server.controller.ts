// Path: src/kafka/factory/kafka-server/kafka-server.controller.ts
// DESC: This is the main entry point for the kafka-server application.
'use strict';
import { Controller, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { KafkaServerService } from './kafka-server.service';

@ApiTags('kafka')
@Controller('kafka')
export class KafkaServerController {
  private logger: Logger = new Logger(KafkaServerController.name);
  constructor(private readonly kafkaServerService: KafkaServerService) {}
}
