// Path: src/webpush/factory/webpush-client/webpush-client.controller.ts
// DESC: This is the main entry point for the webpush-client application.
'use strict';
import { Controller, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WebpushClientService } from './webpush-client.service';

@ApiTags('webpush')
@Controller('webpush')
export class WebpushClientController {
  private logger: Logger = new Logger(WebpushClientController.name);
  constructor(private readonly webpushClientService: WebpushClientService) {}
}
