// Path: src/websocket/factory/websocket-client/websocket-client.service.ts
// DESC: This is the main entry point for the websocket-client application.
'use strict';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Socket, io } from 'socket.io-client';
import { WebsocketClientInterface } from './websocket-client.interface';

@Injectable()
export class WebsocketClientService implements WebsocketClientInterface {
  private logger: Logger = new Logger(WebsocketClientService.name);
  private readonly websocketServerUrl: string;
  private socket: Socket;

  constructor(private readonly configService: ConfigService) {
    this.logger.log('Websocket Client initialized');

    // Initialize websocket server URL
    this.websocketServerUrl = this.initializeWebsocketServerUrl();
    this.logger.log(`Websocket Server URL: ${this.websocketServerUrl}`);

    this.socket = io(this.websocketServerUrl, {
      transports: ['websocket', 'polling'],
    });
    this.socket.on('connect', () => {
      this.logger.log('Connected to WebSocket server');
    });
    this.socket.on('connect_error', (error) => {
      this.logger.error(`Connection error: ${error.message}`);
    });
  }

  private initializeWebsocketServerUrl(): string {
    // const SERVER_HOST: string =
    //   this.configService.get<string>('SERVER_HOST') ||
    //   process.env.SERVER_HOST ||
    //   this.configService.get<string>('SERVICE_HOST') ||
    //   'localhost';
    // const SERVER_PORT: number =
    //   this.configService.get<number>('SERVER_PORT') ||
    //   Number(process.env.SERVER_PORT) ||
    //   this.configService.get<number>('SERVICE_PORT') ||
    //   3001;
    // return `ws://${SERVER_HOST}:${SERVER_PORT}`;
    return 'ws://0.0.0.0:5001';
  }

  sendMessage(message: string): void {
    this.logger.log(`Sending message: ${message}`);
    this.socket.emit('message', message);
    this.socket.on('message', (message: string) => {
      this.logger.log(`Received message: ${message}`);
      // this.handleMessages(message);
    });
  }

  sendEvent(event: string): void {
    this.logger.log(`Sending event: ${event}`);
    this.socket.emit('event', event);
    this.socket.on('event', (event: string) => {
      this.logger.log(`Received event: ${event}`);
      // this.handleEvents(event);
    });
  }

  sendHealth(): void {
    this.logger.log(`Sending health: ping`);
    this.socket.emit('ping', 'ping');
    this.socket.on('pong', (health: string) => {
      this.logger.log(`Received health: ${health}`);
      // this.handleHealth(health);
    });
  }

  // handleMessages(message: string): void {
  //   this.logger.log(`Receiving message ${message}`);
  // }

  // handleEvents(event: string): void {
  //   this.logger.log(`Receiving event ${event}`);
  // }

  // handleHealth(health: string): void {
  //   this.logger.log(`Receiving health ${health}`);
  // }
}
