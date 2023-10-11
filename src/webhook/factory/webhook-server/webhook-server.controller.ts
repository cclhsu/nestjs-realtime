// Path: src/webhook/factory/webhook-server/webhook-server.controller.ts
// DESC: This is the main entry point for the webhook-server application.
'use strict';
import { Body, Controller, Delete, Get, Logger, Param, Post, Put } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiProduces,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { EventDataDTO, WebhookInfoDTO, WebhookRegistrationResponseDTO } from '../../dto';
import { WebhookServerInterface } from './webhook-server.interface';
import { WebhookServerService } from './webhook-server.service';

@ApiTags('webhook')
@Controller('webhook')
export class WebhookServerController implements WebhookServerInterface {
  private logger: Logger = new Logger(WebhookServerController.name);
  constructor(private readonly webhookServerService: WebhookServerService) {}

  // curl -s -X Post -H 'Content-Type: application/json' 'http://0.0.0.0:3001/webhook/register' -d '{"webhookId": "1234567890", "webhookUrl": "http://0.0.0.0:3001/webhook-server/handle-payload"}' | jq
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
  registerWebhook(@Body() request: WebhookInfoDTO): Promise<WebhookRegistrationResponseDTO> {
    return this.webhookServerService.registerWebhook(request);
  }

  // curl -s -X POST -H 'Content-Type: application/json' 'http://0.0.0.0:3001/webhook/handle-event' -d '{"id": "1234567890", "type": "test", "data": {"message": "Hello, World!"}}' | jq
  @ApiOperation({ summary: 'Handle webhook event' })
  @ApiProduces('application/json')
  @ApiBody({
    description: 'Webhook Event Data',
    type: EventDataDTO,
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
  @Post('handle-event')
  handleWebhookEvent(@Body() payload: EventDataDTO): Promise<WebhookRegistrationResponseDTO> {
    return this.webhookServerService.handleWebhookEvent(payload);
  }

  // curl -s -X DELETE -H 'Content-Type: application/json' 'http://0.0.0.0:3001/webhook/unregister' -d '{"webhookId": "1234567890"}' | jq
  @ApiOperation({ summary: 'Unregister a webhook' })
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
  @Delete('unregister/:webhookId')
  unregisterWebhook(@Param() webhookId: string): Promise<WebhookRegistrationResponseDTO> {
    return this.webhookServerService.unregisterWebhook(webhookId);
  }

  // curl -s -X GET -H 'Content-Type: application/json' 'http://0.0.0.0:3001/webhook/list' | jq
  @ApiOperation({ summary: 'List registered webhooks' })
  @ApiProduces('application/json')
  @ApiResponse({
    status: 200,
    description: 'List of registered webhooks',
    type: WebhookInfoDTO,
    isArray: true,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    content: { 'application/json': {} },
  })
  @Get('list')
  listRegisteredWebhooks(): Promise<WebhookInfoDTO[]> {
    return this.webhookServerService.listRegisteredWebhooks();
  }

  // curl -s -X PUT -H 'Content-Type: application/json' 'http://0.0.0.0:3001/webhook/update/1234567890' -d '{"webhookId": "1234567890", "webhookUrl": "http://0.0.0.0:3001/webhook-server/handle-payload"}' | jq
  @ApiOperation({ summary: 'Update a webhook' })
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
  @Put('update/:webhookId')
  updateWebhook(
    @Param() webhookId: string,
    @Body() request: WebhookInfoDTO,
  ): Promise<WebhookRegistrationResponseDTO> {
    return this.webhookServerService.updateWebhook(webhookId, request);
  }
}
