// Path: src/webhook/factory/webhook-client/webhook-client.module.ts
// DESC: This is the main entry point for the webhook-client application.
'use strict';
import { Module } from '@nestjs/common';
import { WebhookClientController } from './webhook-client.controller';
import { WebhookClientService } from './webhook-client.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [WebhookClientController],
  providers: [WebhookClientService],
  exports: [WebhookClientService],
})
export class WebhookClientModule {}
