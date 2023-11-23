// Path: src/webrtc/factory/webrtc-server/webrtc-server.controller.ts
// DESC: This is the main entry point for the webrtc-server application.
'use strict';
import { Controller, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WebRTCServerService } from './webrtc-server.service';

@ApiTags('webrtc')
@Controller('webrtc')
export class WebRTCServerController {
  private logger: Logger = new Logger(WebRTCServerController.name);
  constructor(private readonly webrtcServerService: WebRTCServerService) {}
}
