// Path: src/server-sent-event/factory/server-sent-event-server/server-sent-event-server.module.ts
// DESC: This is the main entry point for the server-sent-event-server application.
'use strict';
import { Module } from '@nestjs/common';
import { ServerSentEventServerService } from './server-sent-event-server.service';

@Module({
  imports: [],
  controllers: [],
  providers: [ServerSentEventServerService],
  exports: [ServerSentEventServerService],
})
export class ServerSentEventServerModule {}
