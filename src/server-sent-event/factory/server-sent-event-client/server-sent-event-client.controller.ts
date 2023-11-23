// Path: src/serversentevent/factory/server-sent-event-client/server-sent-event-client.controller.ts
// DESC: This is the main entry point for the server-sent-event-client application.
'use strict';
import { Controller, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ServerSentEventClientService } from './server-sent-event-client.service';

@ApiTags('serversentevent')
@Controller('serversentevent')
export class ServerSentEventClientController {
  private logger: Logger = new Logger(ServerSentEventClientController.name);
  constructor(private readonly serversenteventClientService: ServerSentEventClientService) {}
}
