// Path: src/server-sent-event/factory/server-sent-event-client/server-sent-event-client.module.ts
// DESC: This is the main entry point for the server-sent-event-client application.
'use strict';
import { Module } from '@nestjs/common';
import { ServerSentEventClientService } from './server-sent-event-client.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [ServerSentEventClientService],
  exports: [ServerSentEventClientService],
})
export class ServerSentEventClientModule {}
