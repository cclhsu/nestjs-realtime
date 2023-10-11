// Path: src/websocket/factory/websocket-client/websocket-client.service.ts
// DESC: This is the main entry point for the websocket-client application.
'use strict';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WebsocketClientInterface } from './websocket-client.interface';

@Injectable()
export class WebsocketClientService implements WebsocketClientInterface {
  private logger: Logger = new Logger(WebsocketClientService.name);
  // private readonly websocketServerUrl: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.logger.log('Websocket Client initialized');

    // Initialize websocket server URL
    // this.websocketServerUrl = this.initializeWebsocketServerUrl();
    // this.logger.log(`Websocket Server URL: ${this.websocketServerUrl}`);

    // Register websocket
    // const websocketData: WebsocketInfoDTO = {};

    // Initialize websocket server URL
    // this.registerWebsocket(websocketData);
  }

  private initializeWebsocketServerUrl(): string {
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
    return `http://${SERVER_HOST}:${SERVER_PORT}/websocket/`;
  }
}
