// Path: src/server-sent-event/factory/server-sent-event-server/server-sent-event-server.service.ts
// DESC: This is the main entry point for the server-sent-event-server application.
'use strict';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ServerSentEventServerService {
  private logger: Logger = new Logger(ServerSentEventServerService.name);
  constructor(
    private readonly configService: ConfigService
  ) {
    this.logger.log('ServerSentEvent Server initialized');
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
