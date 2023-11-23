// Path: src/webpush/factory/webpush-server/webpush-server.controller.ts
// DESC: This is the main entry point for the webpush-server application.
'use strict';
import { Controller, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WebpushServerService } from './webpush-server.service';

@ApiTags('webpush')
@Controller('webpush')
export class WebpushServerController {
  private logger: Logger = new Logger(WebpushServerController.name);
  constructor(private readonly webpushServerService: WebpushServerService) {}
}
