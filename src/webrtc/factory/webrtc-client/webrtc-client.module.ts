// Path: src/webrtc/factory/webrtc-client/webrtc-client.module.ts
// DESC: This is the main entry point for the webrtc-client application.
'use strict';
import { Module } from '@nestjs/common';
import { WebRTCClientService } from './webrtc-client.service';

@Module({
  imports: [],
  controllers: [],
  providers: [WebRTCClientService],
  exports: [WebRTCClientService],
})
export class WebRTCClientModule {}
