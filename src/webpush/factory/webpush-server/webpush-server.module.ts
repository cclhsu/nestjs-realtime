// Path: src/webpush/factory/webpush-server/webpush-server.module.ts
// DESC: This is the main entry point for the webpush-server application.
'use strict';
import { Module } from '@nestjs/common';
import { WebpushServerService } from './webpush-server.service';

@Module({
  imports: [],
  controllers: [],
  providers: [WebpushServerService],
  exports: [WebpushServerService],
})
export class WebpushServerModule {}
