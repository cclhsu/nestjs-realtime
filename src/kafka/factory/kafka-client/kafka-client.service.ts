// Path: src/kafka/factory/kafka-client/kafka-client.service.ts
// DESC: This is the main entry point for the kafka-client application.
'use strict';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KafkaClientService {
  private logger: Logger = new Logger(KafkaClientService.name);
  // private readonly KafkaServerUrl: string;
  constructor(
    private readonly configService: ConfigService
  ) {
    this.logger.log('kafka Client initialized');

    // Initialize kafka server URL
    // this.KafkaServerUrl = this.initializeKafkaServerUrl();
    // this.logger.log(`kafka Server URL: ${this.KafkaServerUrl}`);

    // Register kafka
    // const kafkaData: kafkaInfoDTO = {};

    // Initialize kafka server URL
    // this.registerkafka(kafkaData);
  }

  private initializeKafkaServerUrl(): string {
    const SERVER_HOST: string =
      this.configService.get<string>('SERVER_HOST') ||
      process.env.SERVER_HOST ||
      this.configService.get<string>('SERVICE_HOST') ||
      'localhost';
    const SERVER_PORT: number =
      this.configService.get<number>('SERVER_PORT') ||
      Number(process.env.SERVER_PORT) ||
      this.configService.get<number>('SERVICE_PORT') ||
      3001;
    return `http://${SERVER_HOST}:${SERVER_PORT}/kafka/`;
  }
}
