// Path: src/socketIO/factory/socketio-client/socketio-client.module.ts
// DESC: This is the main entry point for the socketio-client application.
'use strict';
import { Module } from '@nestjs/common';
import { SocketIOClientService } from './socketio-client.service';

@Module({
  imports: [],
  controllers: [],
  providers: [SocketIOClientService],
  exports: [SocketIOClientService],
})
export class SocketIOClientModule {}
