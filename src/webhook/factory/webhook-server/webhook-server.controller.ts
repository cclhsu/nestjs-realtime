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
import { WebhookServerService } from './webhook-server.service';

@ApiTags('webhook')
@Controller('webhook')
export class WebhookServerController
  implements RegistrationControllerInterface, MessageControllerInterface
{
  private logger: Logger = new Logger(WebhookServerController.name);
  constructor(private readonly webhookServerService: WebhookServerService) {}

  // curl -s -X 'POST' -H 'Content-Type: application/json' -H 'accept: application/json' 'http://0.0.0.0:3001/webhook/registration/' -d '{}' | jq
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
  register(@Body() registration: RegistrationDTO): Promise<RegistrationResponseDTO> {
    this.logger.log(`Registering webhook: ${JSON.stringify(registration)}`);
    return this.webhookServerService.register(registration);
  }

  // curl -s -X 'DELETE' -H 'Content-Type: application/json' -H 'accept: application/json' 'http://0.0.0.0:3001/webhook/registration/'
  @ApiOperation({ summary: 'Unregister a webhook with the server' })
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
    return this.webhookServerService.unregister(registrationID);
  }

  // curl -s -X 'GET' -H 'Content-Type: application/json' -H 'accept: application/json' 'http://0.0.0.0:3001/webhook/registration/'
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
    return this.webhookServerService.listRegistrations();
  }

  // curl -s -X 'PUT' -H 'Content-Type: application/json' -H 'accept: application/json' 'http://0.0.0.0:3001/webhook/'
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
    return this.webhookServerService.updateRegistration(registrationID, registration);
  }

  // curl -s -X 'POST' -H 'Content-Type: application/json' -H 'accept: application/json' 'http://0.0.0.0:3001/webhook/'
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
    return this.webhookServerService.send(message);
  }

  // curl -s -X 'POST' -H 'Content-Type: application/json' -H 'accept: application/json' 'http://0.0.0.0:3001/webhook/'
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
    return this.webhookServerService.receive(message);
  }

  // curl -s -X 'GET' -H 'Content-Type: application/json' -H 'accept: application/json' 'http://0.0.0.0:3001/webhook/'
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
    return this.webhookServerService.listMessages();
  }
}
