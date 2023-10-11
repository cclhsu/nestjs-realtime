// Path: src/webhook/factory/webhook-server/webhook-server.module.ts
// DESC: This is the main entry point for the webhook-server application.
'use strict';
import { Module } from '@nestjs/common';
import { WebhookServerController } from './webhook-server.controller';
import { WebhookServerService } from './webhook-server.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [WebhookServerController],
  providers: [WebhookServerService],
  exports: [WebhookServerService],
})
export class WebhookServerModule {}
