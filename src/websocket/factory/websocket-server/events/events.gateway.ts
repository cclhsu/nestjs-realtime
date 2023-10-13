import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io-client';
import { Server } from 'ws';
// import { Server } from 'socket.io';

// @WebSocketGateway({
//   port: 5001,
//   namespace: 'events',
//   cors: {
//     origin: '*',
//     // credentials: true,
//   },
// })
@WebSocketGateway(5001)
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger(EventsGateway.name);
  @WebSocketServer()
  server!: Server;

  constructor() {
    this.logger.log('EventsGateway initialized at port 5001');
  }

  afterInit() {
    this.logger.log('EventsGateway afterInit');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log('ChatGateway handleConnection: ' + client.id);
    // throw new Error('Method not implemented.');
  }

  handleDisconnect(client: Socket) {
    this.logger.log('ChatGateway handleDisconnect: ' + client.id);
    // throw new Error('Method not implemented.');
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): any {
    this.logger.log('EventsGateway handleMessage: ' + client.id + ' ' + payload);
    const message = 'Hello world! message from ' + client.id;
    this.server.emit('message', message);
    return {
      event: 'message',
      data: message,
    };
  }

  @SubscribeMessage('event')
  handleEvent(client: Socket, payload: any): any {
    this.logger.log('EventsGateway handleEvent: ' + client.id + ' ' + payload);
    const event = 'Hello world! event from ' + client.id;
    this.server.emit('event', event);
    return {
      event: 'event',
      data: event,
    };
  }

  @SubscribeMessage('ping')
  handleHealth(client: Socket, payload: any): any {
    this.logger.log(`EventsGateway handleHealth: ${client.id} ${payload}`);
    this.server.emit('pong', 'pong from ' + client.id);
    return {
      event: 'pong',
      data: 'pong',
    };
  }
}
