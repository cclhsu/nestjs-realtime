// Path: src/kafka/factory/kafka-server/kafka-server.service.ts
// DESC: This is the main entry point for the kafka-server application.
'use strict';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { KafkaServerInterface } from './kafka-server.interface';

@Injectable()
export class KafkaServerService implements KafkaServerInterface {
  private logger: Logger = new Logger(KafkaServerService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.logger.log('kafka Server initialized');
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
