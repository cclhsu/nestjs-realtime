// Path: src/websocket/factory/websocket-client/websocket-client.controller.ts
// DESC: This is the main entry point for the websocket-client application.
'use strict';
import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WebsocketClientService } from './websocket-client.service';
import { MessageDTO } from '../../dto/message.dto';

@ApiTags('websocket-client')
@Controller('websocket-client')
export class WebsocketClientController {
  private logger: Logger = new Logger(WebsocketClientController.name);
  constructor(private readonly websocketClientService: WebsocketClientService) {}

  // curl -X POST -H "Content-Type: application/json" -d '{"message":"Hello World"}' http://localhost:3002/websocket-client/send-messages
  @ApiOperation({ summary: 'Send Messages' })
  @ApiProduces('application/json')
  @ApiBody({ type: String })
  @ApiResponse({
    status: 200,
    description: 'Send Messages',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    content: { 'application/json': {} },
  })
  @Post('send-messages')
  sendMessage(@Body() messageDTO: MessageDTO): void {
    this.websocketClientService.sendMessage(messageDTO.message);
  }

  // curl -X POST -H "Content-Type: application/json" -d '{"message":"Hello World"}' http://localhost:3002/websocket-client/send-events
  @ApiOperation({ summary: 'Send Events' })
  @ApiProduces('application/json')
  @ApiBody({ type: String })
  @ApiResponse({
    status: 200,
    description: 'Send Events',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    content: { 'application/json': {} },
  })
  @Post('send-events')
  sendEvent(@Body() eventDTO: MessageDTO): void {
    this.websocketClientService.sendEvent(eventDTO.message);
  }

  // curl -X POST -H "Content-Type: application/json" -d '{}' http://localhost:3002/websocket-client/send-health
  @ApiOperation({ summary: 'Send Health' })
  @ApiProduces('application/json')
  @ApiBody({ type: String })
  @ApiResponse({
    status: 200,
    description: 'Send Health',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    content: { 'application/json': {} },
  })
  @Post('send-health')
  sendHealth(): void {
    this.websocketClientService.sendHealth();
  }
}
