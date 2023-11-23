// Path: src/serversentevent/factory/server-sent-event-server/server-sent-event-server.controller.ts
// DESC: This is the main entry point for the server-sent-event-server application.
'use strict';
import { Controller, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ServerSentEventServerService } from './server-sent-event-server.service';

@ApiTags('serversentevent')
@Controller('serversentevent')
export class ServerSentEventServerController {
  private logger: Logger = new Logger(ServerSentEventServerController.name);
  constructor(private readonly serversenteventServerService: ServerSentEventServerService) {}
}
