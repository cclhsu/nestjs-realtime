// Path: src/kafka/factory/kafka-client/kafka-client.module.ts
// DESC: This is the main entry point for the kafka-client application.
'use strict';
import { Module } from '@nestjs/common';
import { KafkaClientController } from './kafka-client.controller';
import { KafkaClientService } from './kafka-client.service';

@Module({
  imports: [],
  controllers: [KafkaClientController],
  providers: [KafkaClientService],
  exports: [KafkaClientService],
})
export class KafkaClientModule {}
