// Path: src/websocket/factory/websocket-server/websocket-server.module.ts
// DESC: This is the main entry point for the websocket-server application.
'use strict';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { WebsocketServerService } from './websocket-server.service';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [WebsocketServerService],
  exports: [WebsocketServerService],
})
export class WebsocketServerModule {}
