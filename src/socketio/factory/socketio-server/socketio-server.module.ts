// Path: src/socketIO/factory/socketio-server/socketio-server.module.ts
// DESC: This is the main entry point for the socketio-server application.
'use strict';
import { Module } from '@nestjs/common';
import { SocketIOServerService } from './socketio-server.service';

@Module({
  imports: [],
  controllers: [],
  providers: [SocketIOServerService],
  exports: [SocketIOServerService],
})
export class SocketIOServerModule {}
