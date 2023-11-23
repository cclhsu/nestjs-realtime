// Path: src/socketio/factory/socketio-client/socketio-client.controller.ts
// DESC: This is the main entry point for the socketio-client application.
'use strict';
import { Controller, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SocketIOClientService } from './socketio-client.service';

@ApiTags('socketio')
@Controller('socketio')
export class SocketIOClientController {
  private logger: Logger = new Logger(SocketIOClientController.name);
  constructor(private readonly socketioClientService: SocketIOClientService) {}
}
