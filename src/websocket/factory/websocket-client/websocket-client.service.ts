// Path: src/websocket/factory/websocket-client/websocket-client.service.ts
// DESC: This is the main entry point for the websocket-client application.
'use strict';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Socket, io } from 'socket.io-client';
import {
  MessageControllerInterface,
  ConnectionControllerInterface,
} from './../../../common/interface';
import { MessageDTO } from 'src/common/dto';
import { response } from 'express';
import { MESSAGE_TYPES } from 'src/common/constant';

@Injectable()
export class WebsocketClientService implements MessageControllerInterface {
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

    this.socket.on('disconnect', (reason) => {
      this.logger.log(`Disconnected from WebSocket server: ${reason}`);
    });

    // this.socket.on('echo', (reason) => {
    //   this.logger.log(`Echo from WebSocket server: ${reason}`);
    // });

    this.socket.on('echo', this.handleEcho);

    this.socket.on('broadcast', (reason) => {
      this.logger.log(`Broadcast from WebSocket server: ${reason}`);
    });

    this.socket.on('unicast', (reason) => {
      this.logger.log(`Unicast from WebSocket server: ${reason}`);
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

  async send(message: MessageDTO): Promise<void> {
    try {
      this.logger.log(`Sending message: ${JSON.stringify(message)}`);
      var response = null;
      switch (message.type) {
        case MESSAGE_TYPES.MESSAGE_TYPES_BROADCAST:
          response = this.socket.emit('broadcast', message);
          break;
        case MESSAGE_TYPES.MESSAGE_TYPES_ECHO:
          response = this.socket.emit('echo', message);
          break;
        case MESSAGE_TYPES.MESSAGE_TYPES_UNICAST:
          response = this.socket.emit('unicast', message);
          break;
        default:
          this.logger.error(`Invalid message type: ${message.type}`);
          break;
      }

      await Promise.resolve(response);

      // this.logger.log(`Message sending response: ${JSON.stringify(response)}`);

      // return {
      //   status: 'success',
      //   code: '200',
      //   message: `Message sent successfully`,
      //   data: response,
      // }; // Assuming the response contains the registration data
    } catch (error: any) {
      this.logger.error(`Message sending error: ${JSON.stringify(error)}`);
      throw error; // Re-throw the error to handle it at the caller level if needed
    }
  }

  async receive(_message: MessageDTO): Promise<void> {
    throw new Error('Method not implemented.');

    // try {
    //   this.logger.log(`Handling message: ${JSON.stringify(message)}`);
    //   return Promise.resolve();
    // } catch (error: any) {
    //   this.logger.error(`Message handling error: ${JSON.stringify(error)}`);
    //   throw error; // Re-throw the error to handle it at the caller level if needed
    // }
  }

  async listMessages(): Promise<MessageDTO[]> {
    throw new Error('Method not implemented.');
    // try {
    //   this.logger.log(`Listing messages`);

    //   // const response = getRequest<MessageDTO[]>(`${this.websocketServerUrl}/message`);

    //   // await Promise.resolve(response);

    //   // this.logger.log(`Message list response: ${JSON.stringify(response)}`);

    //   // return {
    //   //   status: 'success',
    //   //   code: '200',
    //   //   message: `Messages listed successfully`,
    //   //   data: response,
    //   // }; // Assuming the response contains the registration data
    // } catch (error: any) {
    //   this.logger.error(`Message list error: ${JSON.stringify(error)}`);
    //   throw error; // Re-throw the error to handle it at the caller level if needed
    // }
  }

  handleEcho(reason: string): void {
    console.log(`EventsGateway handleEcho: ${reason}`);
  }

  handleBroadcast(reason: string): void {
    this.logger.log(`EventsGateway handleBroadcast: ${reason}`);
  }

  handleUnicast(reason: string): void {
    this.logger.log(`EventsGateway handleUnicast: ${reason}`);
  }
}
