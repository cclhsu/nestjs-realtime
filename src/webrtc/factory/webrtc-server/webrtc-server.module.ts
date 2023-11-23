// Path: src/webrtc/factory/webrtc-server/webrtc-server.module.ts
// DESC: This is the main entry point for the webrtc-server application.
'use strict';
import { Module } from '@nestjs/common';
import { WebRTCServerService } from './webrtc-server.service';

@Module({
  imports: [],
  controllers: [],
  providers: [WebRTCServerService],
  exports: [WebRTCServerService],
})
export class WebRTCServerModule {}
