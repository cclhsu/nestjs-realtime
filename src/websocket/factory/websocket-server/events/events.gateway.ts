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
  private websocketConnections: Map<string, Socket> = new Map<string, Socket>();
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
    this.websocketConnections.set(client.id, client);
  }

  handleDisconnect(client: Socket) {
    this.logger.log('ChatGateway handleDisconnect: ' + client.id);
    this.websocketConnections.delete(client.id);
  }

  @SubscribeMessage('echo')
  handleEcho(client: Socket, payload: any): any {
    this.logger.log('EventsGateway handleEcho: ' + client.id + ' ' + payload);
    const echo = 'Hello world! echo from ' + client.id;
    client.emit('echo', echo);
    return {
      echo: 'echo',
      data: echo,
    };
  }

  @SubscribeMessage('broadcast')
  handleBroadcast(client: Socket, payload: any): any {
    this.logger.log('EventsGateway handleBroadcast: ' + client.id + ' ' + payload);
    const broadcast = 'Hello world! broadcast from ' + client.id;
    this.server.emit('broadcast', broadcast);
    return {
      broadcast: 'broadcast',
      data: broadcast,
    };
  }

  @SubscribeMessage('unicast')
  handleUnicast(client: Socket, payload: any): any {
    this.logger.log('EventsGateway handleUnicast: ' + client.id + ' ' + payload);
    const unicast = 'Hello world! unicast from ' + client.id;
    this.server.emit('unicast', unicast);
    return {
      unicast: 'unicast',
      data: unicast,
    };
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

  @SubscribeMessage('task')
  handleTask(client: Socket, payload: any): any {
    this.logger.log('EventsGateway handleTask: ' + client.id + ' ' + payload);
    const task = 'Hello world! task from ' + client.id;
    this.server.emit('task', task);
    return {
      task: 'task',
      data: task,
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
