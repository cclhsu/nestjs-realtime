// Path: src/socketio/factory/socketio-server/socketio-server.controller.ts
// DESC: This is the main entry point for the socketio-server application.
'use strict';
import { Controller, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SocketIOServerService } from './socketio-server.service';

@ApiTags('socketio')
@Controller('socketio')
export class SocketIOServerController {
  private logger: Logger = new Logger(SocketIOServerController.name);
  constructor(private readonly socketioServerService: SocketIOServerService) {}
}
