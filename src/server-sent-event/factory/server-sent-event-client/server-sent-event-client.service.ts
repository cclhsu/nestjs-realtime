// Path: src/server-sent-event/factory/server-sent-event-client/server-sent-event-client.service.ts
// DESC: This is the main entry point for the server-sent-event-client application.
'use strict';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ServerSentEventClientService {
  private logger: Logger = new Logger(ServerSentEventClientService.name);
  // private readonly server-sent-eventServerUrl: string;
  constructor(
    private readonly configService: ConfigService
  ) {
    this.logger.log('ServerSentEvent Client initialized');

    // Initialize server-sent-event server URL
    // this.server-sent-eventServerUrl = this.initializeServerSentEventServerUrl();
    // this.logger.log(`ServerSentEvent Server URL: ${this.server-sent-eventServerUrl}`);

    // Register server-sent-event
    // const server-sent-eventData: ServerSentEventInfoDTO = {};

    // Initialize server-sent-event server URL
    // this.registerServerSentEvent(server-sent-eventData);
  }

  private initializeServerSentEventServerUrl(): string {
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
    return `http://${SERVER_HOST}:${SERVER_PORT}/server-sent-event/`;
  }
}
