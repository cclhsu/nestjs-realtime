// Path: src/webhook/factory/webhook-client/webhook-client.module.ts
// DESC: This is the main entry point for the webhook-client application.
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
import {
  MessageDTO,
  MessageResponseDTO,
  RegistrationDTO,
  RegistrationResponseDTO,
} from './../../../common/dto';
import {
  MessageControllerInterface,
  RegistrationControllerInterface,
} from './../../../common/interface';
import { WebhookClientService } from './webhook-client.service';

@ApiTags('webhook-client')
@Controller('webhook-client')
export class WebhookClientController
  implements RegistrationControllerInterface, MessageControllerInterface
{
  private logger: Logger = new Logger(WebhookClientController.name);
  constructor(private readonly webhookClientService: WebhookClientService) {}

  // curl -s -X 'POST' -H 'Content-Type: application/json' -H 'accept: application/json' 'http://0.0.0.0:3002/webhook-client/'
  @ApiOperation({ summary: 'Register a webhook with the server' })
  @ApiProduces('application/json')
  @ApiBody({
    description: 'Webhook Registration Data',
    type: RegistrationDTO,
  })
  @ApiResponse({
    status: 200,
    description: 'Webhook Registration Response',
    type: RegistrationResponseDTO,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    content: { 'application/json': {} },
  })
  @Post('registration')
  async register(@Body() registration: RegistrationDTO): Promise<RegistrationResponseDTO> {
    this.logger.log(`Registering webhook: ${JSON.stringify(registration)}`);
    return await this.webhookClientService.register(registration);
  }

  // curl -s -X 'DELETE' -H 'Content-Type: application/json' -H 'accept: application/json' 'http://0.0.0.0:3002/webhook-client/'
  @ApiOperation({ summary: 'Unregister a webhook from the server' })
  @ApiProduces('application/json')
  @ApiParam({
    name: 'ID',
    description: 'Webhook Registration ID',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Webhook Registration Response',
    type: RegistrationResponseDTO,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    content: { 'application/json': {} },
  })
  @Delete('registration/:ID')
  unregister(@Param('ID') registrationID: string): Promise<void> {
    this.logger.log(`Unregistering webhook: ${registrationID}`);
    return this.webhookClientService.unregister(registrationID);
  }

  // curl -s -X 'GET' -H 'Content-Type: application/json' -H 'accept: application/json' 'http://0.0.0.0:3002/webhook-client/registration'
  @ApiOperation({ summary: 'List registered webhooks' })
  @ApiProduces('application/json')
  @ApiResponse({
    status: 200,
    description: 'List of registered webhooks',
    type: RegistrationDTO,
    isArray: true,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    content: { 'application/json': {} },
  })
  @Get('registration')
  listRegistrations(): Promise<RegistrationDTO[]> {
    this.logger.log(`Listing webhook registrations`);
    return this.webhookClientService.listRegistrations();
  }

  // curl -s -X 'PUT' -H 'Content-Type: application/json' -H 'accept: application/json' 'http://0.0.0.0:3002/webhook-client/'
  @ApiOperation({ summary: 'Update a webhook registration' })
  @ApiProduces('application/json')
  @ApiParam({
    name: 'ID',
    description: 'Webhook Registration ID',
    type: String,
  })
  @ApiBody({
    description: 'Webhook Registration Data',
    type: RegistrationDTO,
  })
  @ApiResponse({
    status: 200,
    description: 'Webhook Registration Response',
    type: RegistrationResponseDTO,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    content: { 'application/json': {} },
  })
  @Put('registration/:ID')
  updateRegistration(
    @Param('ID') registrationID: string,
    @Body() registration: RegistrationDTO,
  ): Promise<RegistrationResponseDTO> {
    this.logger.log(`Updating webhook: ${registrationID} with ${JSON.stringify(registration)}`);
    return this.webhookClientService.updateRegistration(registrationID, registration);
  }

  // curl -s -X 'POST' -H 'Content-Type: application/json' -H 'accept: application/json' 'http://0.0.0.0:3002/webhook-client/'
  @ApiOperation({ summary: 'Send a message to a webhook' })
  @ApiProduces('application/json')
  @ApiBody({
    description: 'Message Data',
    type: MessageDTO,
  })
  @ApiResponse({
    status: 200,
    description: 'Message Data Response',
    type: MessageResponseDTO,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    content: { 'application/json': {} },
  })
  @Post('message/send')
  send(@Body() message: MessageDTO): Promise<void> {
    this.logger.log(`Sending message: ${JSON.stringify(message)}`);
    return this.webhookClientService.send(message);
  }

  // curl -s -X 'POST' -H 'Content-Type: application/json' -H 'accept: application/json' 'http://0.0.0.0:3002/webhook-client/message/receive' -d '{"id": "1234567890", "type": "test", "data": {"message": "Hello, World!"}}' | jq
  @ApiOperation({ summary: 'Receive a message from a webhook' })
  @ApiProduces('application/json')
  @ApiBody({
    description: 'Message Data',
    type: MessageDTO,
  })
  @ApiResponse({
    status: 200,
    description: 'Message Data Response',
    type: MessageResponseDTO,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    content: { 'application/json': {} },
  })
  @Post('message/receive')
  receive(@Body() message: MessageDTO): Promise<void> {
    this.logger.log(`Receiving message: ${JSON.stringify(message)}`);
    return this.webhookClientService.receive(message);
  }

  // curl -s -X 'GET' -H 'Content-Type: application/json' -H 'accept: application/json' 'http://0.0.0.0:3002/webhook-client/'
  @ApiOperation({ summary: 'List messages' })
  @ApiProduces('application/json')
  @ApiResponse({
    status: 200,
    description: 'List of Message Response',
    type: MessageDTO,
    isArray: true,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    content: { 'application/json': {} },
  })
  @Get('message') // Differentiating the path
  listMessages(): Promise<MessageDTO[]> {
    this.logger.log(`Listing messages`);
    return this.webhookClientService.listMessages();
  }
}
