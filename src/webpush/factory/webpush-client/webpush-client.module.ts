// Path: src/webpush/factory/webpush-client/webpush-client.module.ts
// DESC: This is the main entry point for the webpush-client application.
'use strict';
import { Module } from '@nestjs/common';
import { WebpushClientService } from './webpush-client.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [WebpushClientService],
  exports: [WebpushClientService],
})
export class WebpushClientModule {}
