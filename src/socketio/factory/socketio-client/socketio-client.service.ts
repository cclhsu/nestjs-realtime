// Path: src/socketIO/factory/socketio-client/socketio-client.service.ts
// DESC: This is the main entry point for the socketio-client application.
'use strict';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SocketIOClientService {
  private logger: Logger = new Logger(SocketIOClientService.name);
  // private readonly socketIOServerUrl: string;
  constructor(
    private readonly configService: ConfigService
  ) {
    this.logger.log('SocketIO Client initialized');

    // Initialize socketIO server URL
    // this.socketIOServerUrl = this.initializeSocketIOServerUrl();
    // this.logger.log(`SocketIO Server URL: ${this.socketIOServerUrl}`);

    // Register socketIO
    // const socketIOData: SocketIOInfoDTO = {};

    // Initialize socketIO server URL
    // this.registerSocketIO(socketIOData);
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
