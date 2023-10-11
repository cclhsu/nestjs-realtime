// Path: src/kafka/factory/kafka-client/kafka-client.module.ts
// DESC: This is the main entry point for the kafka-client application.
'use strict';
import { Module } from '@nestjs/common';
import { KafkaClientService } from './kafka-client.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [KafkaClientService],
  exports: [KafkaClientService],
})
export class KafkaClientModule {}
