// Path: src/websocket/factory/websocket-client/websocket-client.module.ts
// DESC: This is the main entry point for the websocket-client application.
'use strict';
import { Module } from '@nestjs/common';
import { WebsocketClientService } from './websocket-client.service';
import { WebsocketClientController } from './websocket-client.controller';

@Module({
  imports: [],
  controllers: [WebsocketClientController],
  providers: [WebsocketClientService],
  exports: [WebsocketClientService],
})
export class WebsocketClientModule {}
