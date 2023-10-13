// Path: src/websocket/factory/websocket-server/websocket-server.module.ts
// DESC: This is the main entry point for the websocket-server application.
'use strict';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { WebsocketServerService } from './websocket-server.service';
import { EventsGateway } from './events/events.gateway';

@Module({
  imports: [
    HttpModule,
    // WebsocketServerModule.configure({
    //   cors: {
    //     origin: '*',
    //   },
    // }),
  ],
  controllers: [],
  providers: [WebsocketServerService, EventsGateway],
  exports: [WebsocketServerService],
})
export class WebsocketServerModule {}
