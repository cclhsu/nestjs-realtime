// Path: src/webhook/factory/webhook-client/webhook-client.module.ts
// DESC: This is the main entry point for the webhook-client application.
'use strict';
import { Body, Controller, Logger, Param, Post, Put } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiProduces,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  EventDataDTO,
  EventDataResponseDTO,
  WebhookInfoDTO,
  WebhookRegistrationResponseDTO,
} from '../../dto';
import { WebhookClientInterface } from './webhook-client.interface';
import { WebhookClientService } from './webhook-client.service';

@ApiTags('webhook-client')
@Controller('webhook-client')
export class WebhookClientController implements WebhookClientInterface {
  private logger: Logger = new Logger(WebhookClientController.name);
  constructor(private readonly webhookClientService: WebhookClientService) {}

  // curl -s -X POST -H 'Content-Type: application/json' 'http://0.0.0.0:3001/webhook-client/register' -d '{}' | jq
  @ApiOperation({ summary: 'Register a webhook' })
  @ApiProduces('application/json')
  @ApiBody({
    description: 'Webhook Registration Data',
    type: WebhookInfoDTO,
  })
  @ApiResponse({
    status: 200,
    description: 'Webhook Registration Response',
    type: WebhookRegistrationResponseDTO,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    content: { 'application/json': {} },
  })
  @Post('register')
  registerWebhook(@Body() webhookData: WebhookInfoDTO): Promise<WebhookRegistrationResponseDTO> {
    return this.webhookClientService.registerWebhook(webhookData);
  }

  // curl -s -X POST -H 'Content-Type: application/json' 'http://0.0.0.0:3001/webhook-client/trigger-event' -d '{"id": "1234567890", "type": "test", "data": {"message": "Hello, World!"}}' | jq
  @ApiOperation({ summary: 'Trigger an event' })
  @ApiProduces('application/json')
  @ApiBody({
    description: 'Event Data',
    type: EventDataDTO,
  })
  @ApiResponse({
    status: 200,
    description: 'Event Data Response',
    type: EventDataResponseDTO,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    content: { 'application/json': {} },
  })
  @Post('trigger-event')
  triggerEvent(@Body() eventDataDTO: EventDataDTO): Promise<EventDataResponseDTO> {
    return this.webhookClientService.triggerEvent(eventDataDTO);
  }

  // curl -s -X POST -H 'Content-Type: application/json' 'http://0.0.0.0:3001/webhook-client/handle-payload' -d '{"id": "1234567890", "type": "test", "data": {"message": "Hello, World!"}}' | jq
  @ApiOperation({ summary: 'Handle a triggered event' })
  @ApiProduces('application/json')
  @ApiBody({
    description: 'Event Data',
    type: EventDataDTO,
  })
  @ApiResponse({
    status: 200,
    description: 'Event Data Response',
    type: EventDataResponseDTO,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    content: { 'application/json': {} },
  })
  @Post('handle-payload')
  handleTriggeredEvent(@Body() eventDataDTO: EventDataDTO): Promise<EventDataResponseDTO> {
    return this.webhookClientService.handleTriggeredEvent(eventDataDTO);
  }

  // curl -s -X PUT -H 'Content-Type: application/json' 'http://0.0.0.0:3001/webhook-client/disconnect/1234567890' -d '{}' | jq
  @ApiOperation({ summary: 'Disconnect a webhook' })
  @ApiProduces('application/json')
  @ApiParam({
    name: 'webhookId',
    description: 'Webhook ID',
    type: String,
  })
  @ApiBody({
    description: 'Webhook Registration Data',
    type: WebhookInfoDTO,
  })
  @ApiResponse({
    status: 200,
    description: 'Webhook Registration Response',
    type: WebhookRegistrationResponseDTO,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    content: { 'application/json': {} },
  })
  @Put('disconnect/:webhookId')
  disconnectWebhook(@Param() webhookId: string): Promise<WebhookRegistrationResponseDTO> {
    return this.webhookClientService.disconnectWebhook(webhookId);
  }
}
