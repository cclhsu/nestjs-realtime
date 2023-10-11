// Path: src/kafka/factory/kafka-server/kafka-server.module.ts
// DESC: This is the main entry point for the kafka-server application.
'use strict';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { KafkaServerService } from './kafka-server.service';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [KafkaServerService],
  exports: [KafkaServerService],
})
export class KafkaServerModule {}
