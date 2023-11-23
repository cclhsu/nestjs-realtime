// Path: src/socketIO/factory/socketio-server/socketio-server.service.ts
// DESC: This is the main entry point for the socketio-server application.
'use strict';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SocketIOServerService {
  private logger: Logger = new Logger(SocketIOServerService.name);
  constructor(
    private readonly configService: ConfigService
  ) {
    this.logger.log('SocketIO Server initialized');
  }

  private initializeSocketIOServerUrl(): string {
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
    return `http://${SERVER_HOST}:${SERVER_PORT}/socketIO/`;
  }
}
