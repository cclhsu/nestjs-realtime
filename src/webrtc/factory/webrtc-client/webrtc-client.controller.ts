// Path: src/webrtc/factory/webrtc-client/webrtc-client.controller.ts
// DESC: This is the main entry point for the webrtc-client application.
'use strict';
import { Controller, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WebRTCClientService } from './webrtc-client.service';

@ApiTags('webrtc')
@Controller('webrtc')
export class WebRTCClientController {
  private logger: Logger = new Logger(WebRTCClientController.name);
  constructor(private readonly webrtcClientService: WebRTCClientService) {}
}
